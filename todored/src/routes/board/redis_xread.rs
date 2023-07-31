use std::sync::Arc;
use axum::extract::ws::{CloseCode, Message};
use deadqueue::unlimited::Queue;
use redis::aio::Connection;

pub type XReadResult = (String, String, String, String);

pub async fn handler(
	mut rconn: Connection,
	key: String,
	messages_to_send: Arc<Queue<Message>>,
) -> CloseCode {
	log::trace!("Thread started!");

	let mut seq = "0".to_string();

	loop {
		log::trace!("Waiting for events to broadcast for 5 seconds...");
		let response = redis::cmd("XREAD")
			.arg("COUNT")
			.arg(1)
			.arg("BLOCK")
			.arg(5000)
			.arg("STREAMS")
			.arg(&key)
			.arg(&seq)
			.query_async::<Connection, Option<XReadResult>>(&mut rconn).await;

		if let Err(err) = response {
			log::error!("Could not XREAD Redis stream, closing connection: {err:?}");
			return 1002;
		}
		let response = response.unwrap();

		if response.is_none() {
			continue;
		}
		let response = response.unwrap();

		seq = response.1;
		let message = response.3;

		log::trace!("Received event, sending it: {message:?}");
		messages_to_send.push(Message::Text(message))
	}
}
