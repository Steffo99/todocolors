use std::sync::Arc;
use axum::extract::ws::{CloseCode, Message};
use deadqueue::unlimited::Queue;
use redis::aio::Connection;
use redis::{AsyncCommands, FromRedisValue, RedisResult};
use redis::streams::{StreamReadOptions, StreamReadReply};

pub async fn handler(
	mut rconn: Connection,
	key: String,
	messages_to_send: Arc<Queue<Message>>,
) -> CloseCode {
	log::trace!("Thread started!");

	let mut seq = "0".to_string();

	loop {
		log::trace!("Waiting for events to broadcast for 5 seconds...");
		let response: RedisResult<StreamReadReply> = rconn.xread_options(
			&[&key],
			&[&seq],
			&StreamReadOptions::default().block(5000)
		).await;

		match response {
			Err(err) => {
				log::error!("Could not XREAD Redis stream, closing connection: {err:?}");
				return 1002;
			},
			Ok(reply) => {
				match reply.keys.get(0) {
					None => {
						log::trace!("Stream does not exist yet, retrying...");
					}
					Some(key) => {
						key.ids.iter().for_each(|id| {
							match id.map.get("change") {
								None => {
									log::warn!("Malformed event, skipping: {id:?}");
								}
								Some(value) => {
									match value {
										redis::Value::Data(data) => {
											match String::from_byte_vec(data) {
												None => {
													log::warn!("Event with no data, skipping: {data:?}");
												}
												Some(strings) => {
													strings.into_iter().for_each(|string| {
														log::trace!("Received event, sending it: {string:?}");
														messages_to_send.push(Message::Text(string))
													})
												}
											}
										}
										_ => {
											log::warn!("Malformed value, skipping...");
										}
									}
								}
							}
							seq = id.id.clone();
						})
					}
				}
			},
		}
	}
}
