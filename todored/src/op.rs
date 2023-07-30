use serde::{Deserialize, Serialize};
use uuid::Uuid;

use super::task::Task;

/// An operation sent from the client to the server.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum ClientOperation {
	/// Set the board's title.
	Title(String),
	/// Create a new [`Task`], or update or delete the task with the given [`Uuid`].
	Task(Option<Uuid>, Option<Task>),
}

/// An operation sent from the server to the clients, and stored on the database.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum ServerOperation {
	/// Set the board's title.
	Title(String),
	/// Create, update, or delete the [`Task`] with the given [`Uuid`].
	Task(Uuid, Option<Task>),
}
