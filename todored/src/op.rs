use serde::{Deserialize, Serialize};

use super::task::Task;

/// An operation sent from the client to the server.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum ClientOperation {
	/// Set the board's title.
	Title(String),
	/// Create a new [`Task`], or update or delete the task with the given [`Uuid`].
	Task(Option<String>, Option<Task>),
}

/// An operation sent from the server to the clients, and stored on the database.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum BoardOperation {
	/// Set the board's title.
	Title(String),
	/// Create, update, or delete the [`Task`] with the given [`Uuid`].
	Task(String, Option<Task>),
}

impl ClientOperation {
	fn handle(self) {
		todo!()
	}
}

impl BoardOperation {
	/// Store this in Redis.
	pub(crate) async fn store_or_500(&self, rconn: &mut redis::aio::Connection, board: &str) -> Result<String> {
		log::debug!("Storing BoardOperation in Redis: {:?}", &self);

		log::trace!("Computing Redis key...");
		let stream_key = format!("board:{{{board}}}:stream");

		log::trace!("Serializing BoardOperation to JSON...");
		let operation = serde_json::ser::to_string(self)
			.expect_or_500_and_log("Failed to serialize BoardOperation")?;

		log::trace!("Adding to the Redis stream {stream_key:?}...");
		let id = redis::cmd("XADD")
			.arg(stream_key)
			.arg("*")
			.arg("operation")
			.arg(operation)
			.query_async::<redis::aio::Connection, String>(rconn).await
			.expect_or_500_and_log("Failed to XADD to Redis")?;

		log::trace!("Added to Redis stream with id {id:?}!");
		Ok(id)
	}
}
