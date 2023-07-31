use axum::extract::ws::{Message, WebSocket};
use tokio::sync::RwLock;
use std::sync::Arc;
use deadqueue::unlimited::Queue;
use futures_util::{SinkExt, StreamExt};
use super::{redis_xread, redis_xadd, ws_receive, ws_send};

pub async fn handler(
	board_name: String,
	rclient: redis::Client,
	websocket: WebSocket,
) {
	log::trace!("Splitting socket into two separate pipes...");
	let (mut sender, receiver) = websocket.split();

	log::trace!("Creating Redis connection for the reader thread...");
	let reader_redis = rclient.get_async_connection().await;
	if reader_redis.is_err() {
		log::error!("Could not open Redis connection for the reader thread.");
		let _ = sender.close().await;
		return;
	}
	let reader_redis = reader_redis.unwrap();
	log::trace!("Created Redis connection for the reader thread!");

	log::trace!("Creating Redis connection for the writer thread...");
	let writer_redis = rclient.get_async_connection().await;
	if writer_redis.is_err() {
		log::error!("Could not open Redis connection for the writer thread.");
		let _ = sender.close().await;
		return;
	}
	let writer_redis = writer_redis.unwrap();
	log::trace!("Created Redis connection for the writer thread!");

	let is_ws_closing: Arc<RwLock<bool>> = Arc::new(RwLock::new(false));
	let strings_to_process: Arc<Queue<String>> = Arc::new(Queue::new());
	let messages_to_send: Arc<Queue<Message>> = Arc::new(Queue::new());

	let ws_receive_thread = tokio::spawn(ws_receive::handler(
		receiver,
		is_ws_closing.clone(),
		strings_to_process.clone(),
		messages_to_send.clone(),
	));

	todo!();
	let ws_send_thread = tokio::spawn(ws_send::handler(sender));
	let redis_xadd_thread = tokio::spawn(redis_xadd::handler());
	let redis_xread_thread = tokio::spawn(redis_xread::handler());

}
