//! The first iteration of tasks.

use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// A change to a board's contents.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum BoardChange {
	/// Set the board's title.
	Title(String),
	/// Create, update, or delete the [`Task`] with the given [`Uuid`].
	Task(Uuid, Option<Task>),
	/// Add the given client to the connected clients list.
	Connect(Uuid),
	/// Remove the given client from the connected clients list.
	Disconnect(Uuid),
}

/// A task that can be displayed on the board.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Task {
	#[serde(default)]
	pub text: String,

	#[serde(default)]
	pub icon: TaskIcon,

	#[serde(default)]
	pub importance: TaskImportance,

	#[serde(default)]
	pub priority: TaskPriority,

	#[serde(default)]
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

impl Default for TaskIcon {
	fn default() -> Self {
		TaskIcon::Circle
	}
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

impl Default for TaskImportance {
	fn default() -> Self {
		TaskImportance::Normal
	}
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

impl Default for TaskPriority {
	fn default() -> Self {
		TaskPriority::Normal
	}
}

/// The status a [`Task`] is currently in.
#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum TaskStatus {
	Unfinished,
	InProgress,
	Complete,
}

impl Default for TaskStatus {
	fn default() -> Self {
		TaskStatus::Unfinished
	}
}
