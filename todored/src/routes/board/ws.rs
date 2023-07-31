use axum::extract::ws::{CloseCode, CloseFrame, Message, WebSocket};
use std::sync::Arc;
use deadqueue::unlimited::Queue;
use futures_util::StreamExt;
use super::{redis_xread, redis_xadd, ws_receive, ws_send};

pub async fn handler(
	board_name: String,
	rclient: redis::Client,
	websocket: WebSocket,
) {
	log::trace!("Creating Redis connection for the XADD thread...");
	let xadd_redis = rclient.get_async_connection().await;
	if xadd_redis.is_err() {
		log::error!("Could not open Redis connection for the XADD thread.");
		let _ = websocket.close().await;
		return;
	}
	let xadd_redis = xadd_redis.unwrap();
	log::trace!("Created Redis connection for the XADD thread!");

	log::trace!("Creating Redis connection for the XREAD thread...");
	let xread_redis = rclient.get_async_connection().await;
	if xread_redis.is_err() {
		log::error!("Could not open Redis connection for the XREAD thread.");
		let _ = websocket.close().await;
		return;
	}
	let xread_redis = xread_redis.unwrap();
	log::trace!("Created Redis connection for the XREAD thread!");

	log::trace!("Splitting socket into two separate pipes...");
	let (sender, receiver) = websocket.split();

	log::trace!("Determining Redis key to operate on...");
	let redis_key = format!("board:{{{board_name}}}:stream");
	log::trace!("Redis key is: {redis_key:?}");

	log::trace!("Creating synchronization structures...");
	let strings_to_process: Arc<Queue<String>> = Arc::new(Queue::new());
	let messages_to_send: Arc<Queue<Message>> = Arc::new(Queue::new());

	log::trace!("Spawning ws_receive_thread...");
	let ws_receive_thread = tokio::spawn(ws_receive::handler(
		receiver,
		strings_to_process.clone(),
		messages_to_send.clone(),
	));
	let ws_receive_abort = ws_receive_thread.abort_handle();

	log::trace!("Spawning ws_send_thread...");
	let ws_send_thread = tokio::spawn(ws_send::handler(
		sender,
		messages_to_send.clone(),
	));

	log::trace!("Spawning redis_xadd_thread...");
	let redis_xadd_thread = tokio::spawn(redis_xadd::handler(
		xadd_redis,
		redis_key.clone(),
		strings_to_process.clone()
	));
	let redis_xadd_abort = redis_xadd_thread.abort_handle();

	log::trace!("Spawning redis_xread_thread...");
	let redis_xread_thread = tokio::spawn(redis_xread::handler(
		xread_redis,
		redis_key,
		messages_to_send.clone()
	));
	let redis_xread_abort = redis_xread_thread.abort_handle();

	log::trace!("Waiting for the socket to close...");
	tokio::select!(
		cc = ws_receive_thread => {
			close_with_code(messages_to_send, match cc { Ok(cc) => cc, _ => 1000 });
		},
		cc = redis_xadd_thread => {
			close_with_code(messages_to_send, match cc { Ok(cc) => cc, _ => 1000 });
		},
		cc = redis_xread_thread => {
			close_with_code(messages_to_send, match cc { Ok(cc) => cc, _ => 1000 });
		},
	);
	ws_receive_abort.abort();
	redis_xadd_abort.abort();
	redis_xread_abort.abort();

	log::trace!("Waiting for the last messages to be sent...");
	let _ws_send_join = tokio::join!(ws_send_thread);

	log::debug!("Websocket threads closed successfully!")
}

fn close_with_code(
	messages_to_send: Arc<Queue<Message>>,
	close_code: CloseCode,
) {
	messages_to_send.push(Message::Close(Some(CloseFrame { code: close_code, reason: "".into() })));
}
