use serde::{Deserialize, Serialize};

use super::task::Task;

/// An operation sent from the client to the server.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum ClientOperation {
	/// Set the board's title.
	Title(String),
	/// Create a new [`Task`], or update or delete the task with the given [`Uuid`].
	Task(Option<u64>, Option<Task>),
}

/// An operation sent from the server to the clients, and stored on the database.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum ServerOperation {
	/// Set the board's title.
	Title(String),
	/// Create, update, or delete the [`Task`] with the given [`Uuid`].
	Task(u64, Option<Task>),
}

impl ClientOperation {
	fn handle(self) {
		todo!()
	}
}

impl ServerOperation {
	fn store(&self, rconn: redis::aio::Connection, board: &str) -> Result<()> {
		log::debug!("Storing ServerOperation in Redis: {:?}", &self);

		log::trace!("Serializing ServerOperation to JSON...");
		let data = serde_json::ser::to_string(self)
			.expect_or_500_and_log("Failed to serialize ServerOperation");

		log::trace!("Computing Redis key...");
		let stream_key = format!("board:{{{board}}}:stream");

		log::trace!("Adding to the Redis stream {stream_key:?}...");
		let response = redis::cmd("XADD")
			.arg(stream_key)
			.arg()


		Ok(())
	}
}
