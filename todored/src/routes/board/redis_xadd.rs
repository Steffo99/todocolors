use axum::extract::ws::{Message, WebSocket};
use futures_util::stream::SplitStream;
use crate::routes::board::structs::BoardAction;

pub async fn handler(
	mut receiver: SplitStream<WebSocket>,
	mut rconn: redis::aio::Connection,
	board_name: &str,
) -> Result<SplitStream<WebSocket>, ()> {

		log::trace!("Handling websocket frame...");
		match value {
			Message::Text(value) => {
				log::trace!("Trying to parse value from websocket as a BoardRequest...");
				let action = serde_json::de::from_str::<BoardAction>(&value);

				if let Err(err) = action {
					log::error!("Could not parse value received from websocket as a BoardRequest: {err:?}");
					return receiver;
				}
				let value = action.unwrap();

				BoardRequest {
					name:
				}

				value.handle(&mut rconn).await;
			}
			Message::Binary(_) => {}
			Message::Ping(_) => {}
			Message::Pong(_) => {}
			Message::Close(value) => {
				log::debug!("Client closed websocket: {value:?}");
				return receiver;
			}
		}
	}
}
