use std::sync::Arc;
use axum::extract::ws::{CloseCode, Message};
use deadqueue::unlimited::Queue;
use redis::aio::Connection;
use redis::AsyncCommands;
use redis::streams::{StreamReadOptions, StreamReadReply};
use crate::outcome::LoggableOutcome;
use crate::routes::board::stream::xread_to_vbc;

pub async fn handler(
	mut rconn: Connection,
	key: String,
	messages_to_send: Arc<Queue<Message>>,
) -> Result<(), CloseCode> {
	log::trace!("Thread started!");

	let mut seq = "0".to_string();

	loop {
		log::trace!("Waiting for events to broadcast for 60 seconds...");
		let r: StreamReadReply = rconn
			.xread_options(
				&[&key],
				&[&*seq],
				&StreamReadOptions::default().block(60000)
			).await
			.log_err_to_error("Could not XREAD events from Redis")
			.map_err(|_| 1011u16)?;

		log::trace!("Processing events retrieved from Redis...");
		let (vec, new_seq) = xread_to_vbc(r).await;
		seq = new_seq;
		vec
			.into_iter()
			.for_each(|vbc| {
				log::trace!("Upgrading event to the latest possible version...");
				let bc = vbc.to_latest_bc();

				log::trace!("Serializing event...");
				match serde_json::ser::to_string(&bc) {
					Err(err) => {
						log::warn!("Failed to serialize BoardChange, skipping: {err:?}");
					}
					Ok(string) => {
						log::trace!("Pushing serialized event to queue...");
						messages_to_send.push(Message::Text(string));
					}
				}
			});
	}
}
