use axum::extract::ws::{CloseCode, Message, WebSocket};
use futures_util::stream::SplitStream;
use deadqueue::unlimited::Queue;
use std::sync::Arc;
use futures_util::StreamExt;

pub async fn handler(
	mut receiver: SplitStream<WebSocket>,
	strings_to_process: Arc<Queue<String>>,
	messages_to_send: Arc<Queue<Message>>,
) -> Result<(), CloseCode> {
	log::trace!("Thread started!");

	loop {
		log::trace!("Awaiting data from the websocket...");
		let value = receiver.next().await;
		log::trace!("Received from websocket: {value:?}");

		log::trace!("Checking if the websocket timed out...");
		if value.is_none() {
			log::debug!("Websocket timed out, closing connection.");
			return Err(1001u16);
		}
		let value = value.unwrap();

		log::trace!("Checking if websocket returned an error...");
		if let Err(err) = value {
			log::error!("Websocket returned error: {err:?}");
			return Err(1002u16);
		}
		let value = value.unwrap();

		log::trace!("Delegating websocket message...");
		match value {
			Message::Text(msg) => {
				log::trace!("Received a string, delegating to message handler: {msg:?}");
				strings_to_process.push(msg);
			}
			Message::Binary(_) => {
				log::warn!("Received a binary, closing connection.");
				return Err(1003u16);
			}
			Message::Ping(vec) => {
				log::trace!("Received a ping, delegating to pong handler: {vec:?}");
				messages_to_send.push(Message::Pong(vec));
			}
			Message::Pong(_) => {
				log::warn!("Received a pong, ignoring.")
			}
			Message::Close(cls) => {
				log::debug!("Received a close, closing connection: {cls:?}");
				return Err(1000u16);
			}
		}
	}
}
