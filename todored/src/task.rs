//! Module with containers related to boards and tasks.

use serde::{Deserialize, Serialize};
use crate::outcome::LoggableOutcome;
use uuid::Uuid;

/// A change to a board's contents.
#[derive(Clone, Debug, Serialize, Deserialize)]
#[non_exhaustive]
pub enum BoardChange {
	/// Set the board's title.
	Title(String),
	/// Set the board's grouping.
	Group(BoardGrouping),
	/// Create, update, or delete the [`Task`] with the given [`Uuid`].
	Task(Uuid, Option<Task>),
}

impl BoardChange {
	/// Store this in Redis.
	pub(crate) async fn store_in_redis(&self, rconn: &mut redis::aio::Connection, key: &str) -> Result<String, ()> {
		log::debug!("Storing BoardOperation in Redis: {:?}", &self);

		log::trace!("Serializing BoardOperation to JSON...");
		let operation = serde_json::ser::to_string(self)
			.log_err_to_error("Failed to serialize BoardOperation")
			.map_err(|_| ())?;

		log::trace!("Adding to the Redis stream {stream_key:?}...");
		let id = redis::cmd("XADD")
			.arg(key)
			.arg("*")
			.arg("operation")
			.arg(operation)
			.query_async::<redis::aio::Connection, String>(rconn).await
			.log_err_to_error("Failed to XADD to Redis")
			.map_err(|_| ())?;

		log::trace!("Added to Redis stream with id {id:?}!");
		Ok(id)
	}
}

/// A possible grouping of a board's tasks.
#[derive(Clone, Debug, Serialize, Deserialize)]
#[non_exhaustive]
pub enum BoardGrouping {
	/// Group tasks by icon.
	Icon,
	/// Group tasks by importance.
	Importance,
	/// Group tasks by priority.
	Priority,
	/// Group tasks by status.
	Status,
}

/// A task that can be displayed on the board.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Task {
	pub text: String,
	pub icon: TaskIcon,
	pub importance: TaskImportance,
	pub priority: TaskPriority,
	pub status: TaskStatus,
}

/// Possible icons for a [`Task`].
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum TaskIcon {
	User,
	Image,
	Envelope,
	Star,
	Heart,
	Comment,
	FaceSmile,
	File,
	Bell,
	Bookmark,
	Eye,
	Hand,
	PaperPlane,
	Handshake,
	Sun,
	Clock,
	Circle,
	Square,
	Building,
	Flag,
	Moon,
}

/// The importance of a [`Task`] (how much it matters).
#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum TaskImportance {
	Highest,
	High,
	Normal,
	Low,
	Lowest,
}

/// The priority of a [`Task`] (how soon it should be completed).
#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum TaskPriority {
	Highest,
	High,
	Normal,
	Low,
	Lowest,
}

/// The status a [`Task`] is currently in.
#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum TaskStatus {
	Unfinished,
	InProgress,
	Complete,
}
