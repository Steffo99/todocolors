use std::sync::Arc;
use axum::extract::ws::{Message, WebSocket};
use deadqueue::unlimited::Queue;
use futures_util::SinkExt;
use futures_util::stream::SplitSink;
use crate::outcome::LoggableOutcome;

pub async fn handler(
	mut sender: SplitSink<WebSocket, Message>,
	messages_to_send: Arc<Queue<Message>>,
) {
	log::trace!("Thread started!");

	loop {
		log::trace!("Awaiting data to send...");
		let message = messages_to_send.pop().await;

		let exit_when_done = matches!(message, Message::Close(_));

		log::trace!("Sending message: {message:?}");
		let _ = sender.send(message).await
			.log_err_to_warn("Could not send message");

		if exit_when_done {
			log::trace!("Done sending messages, shutting down...");
			return;
		}
	}
}
