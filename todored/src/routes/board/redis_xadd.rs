use std::sync::Arc;
use axum::extract::ws::CloseCode;
use deadqueue::unlimited::Queue;
use redis::aio::Connection;
use crate::routes::board::structs::{BoardAction, BoardRequest};

pub async fn handler(
	mut rconn: Connection,
	key: String,
	strings_to_process: Arc<Queue<String>>,
) -> CloseCode {
	log::trace!("Thread started!");

	loop {
		log::trace!("Waiting for strings to process...");
		let message = strings_to_process.pop().await;

		log::trace!("Trying to parse string as a BoardAction...");
		let action = serde_json::de::from_str::<BoardAction>(&message);

		if let Err(err) = action {
			log::error!("Could not parse value received from websocket as a BoardRequest, closing connection: {err:?}");
			return 1002;
		}
		let key = key.to_owned();
		let action = action.unwrap();

		log::trace!("Handling BoardRequest...");
		BoardRequest { key, action }.handle(&mut rconn).await;
	}
}
