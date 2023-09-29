use std::sync::Arc;
use axum::extract::ws::CloseCode;
use deadqueue::unlimited::Queue;
use redis::aio::Connection;
use crate::outcome::LoggableOutcome;
use crate::routes::board::structs::{BoardAction, BoardRequest};

pub async fn handler(
	mut rconn: Connection,
	key: String,
	strings_to_process: Arc<Queue<String>>,
) -> Result<(), CloseCode> {
	log::trace!("Thread started!");

	loop {
		log::trace!("Waiting for strings to process...");
		let message = strings_to_process.pop().await;

		log::trace!("Trying to parse string as a BoardAction...");
		let action = serde_json::de::from_str::<BoardAction>(&message)
			.log_err_to_error("Could not parse value received from websocket as a BoardRequest")
			.map_err(|_| 1002u16)?;

		log::trace!("Handling BoardRequest...");
		BoardRequest { key: key.clone(), action }.handle(&mut rconn).await?;
	}
}
