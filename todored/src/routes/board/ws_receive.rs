use axum::extract::ws::{CloseFrame, Message, WebSocket};
use futures_util::stream::SplitStream;
use deadqueue::unlimited::Queue;
use tokio::sync::RwLock;
use std::sync::Arc;
use futures_util::StreamExt;

pub async fn handler(
	mut receiver: SplitStream<WebSocket>,
	is_ws_closing: Arc<RwLock<bool>>,
	strings_to_process: Arc<Queue<String>>,
	messages_to_send: Arc<Queue<Message>>,
) {
	log::trace!("ws_receive thread started!");

	loop {
		log::trace!("Awaiting data from the websocket...");
		let value = receiver.next().await;
		log::trace!("Received from websocket: {value:?}");

		log::trace!("Checking if the websocket timed out...");
		if value.is_none() {
			log::debug!("Websocket timed out, closing connection.");
			let is_ws_closing = is_ws_closing.write().await;
			*is_ws_closing = true;
			messages_to_send.push(Message::Close(Some(CloseFrame { code: 1001, reason: "Timed out".into() })));
			return;
		}
		let value = value.unwrap();

		log::trace!("Checking if websocket returned an error...");
		if let Err(err) = value {
			log::error!("Websocket returned error: {err:?}");
			return;
		}
		let value = value.unwrap();

		log::trace!("Delegating websocket message...");
		match value {
			Message::Text(msg) => {
				log::trace!("Received a string, delegating to message handler.");
				strings_to_process.push(msg);
			}
			Message::Binary(_) => {
				log::warn!("Received a binary, closing connection.");
				let is_ws_closing = is_ws_closing.write().await;
				*is_ws_closing = true;
				messages_to_send.push(Message::Close(Some(CloseFrame { code: 1003, reason: "Binary is unsupported".into() })));
				return;
			}
			Message::Ping(vec) => {
				log::trace!("Received a ping, delegating to pong handler.");
				messages_to_send.push(Message::Pong(vec));
			}
			Message::Pong(_) => {
				log::warn!("Received a pong, ignoring.")
			}
			Message::Close(_) => {
				log::debug!("Received a close, closing connection.");
				let is_ws_closing = is_ws_closing.write().await;
				*is_ws_closing = true;
				messages_to_send.push(Message::Close(Some(CloseFrame { code: 1000, reason: "Closing as requested".into() })));
				return;
			}
		}
	}
}
