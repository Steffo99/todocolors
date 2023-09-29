//! Adds [`BoardState`], [`Task::started_on`], [`Task::completed_on`] and [`Task::journaled_on`].

use std::collections::{HashMap, HashSet};
use serde::{Deserialize, Serialize};
use chrono::DateTime;
use chrono::Utc;
use chrono::serde::{ts_milliseconds, ts_milliseconds_option};
use uuid::Uuid;
use super::v1;

/// A change to a board's contents.
#[derive(Clone, Debug, Serialize, Deserialize)]
#[non_exhaustive]
pub enum BoardChange {
	/// Set the board's title.
	Title(String),
	/// Create, update, or delete the [`Task`] with the given [`Uuid`].
	Task(Uuid, Option<Task>),
	/// Add the given client to the connected clients list.
	Connect(Uuid),
	/// Remove the given client from the connected clients list.
	Disconnect(Uuid),
	/// Disable editing the board.
	///
	/// This is only a client-side change; it is not enforced on the server side!
	Lock(bool),
	/// Unilaterally set the [`BoardState`], overriding everything else sent so far.
	State(BoardState),
}

/// A task that can be displayed on the board.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Task {
	#[serde(default)]
	pub text: String,

	#[serde(default)]
	pub icon: v1::TaskIcon,

	#[serde(default)]
	pub importance: v1::TaskImportance,

	#[serde(default)]
	pub priority: v1::TaskPriority,

	/// When the task was created.
	#[serde(default, with = "ts_milliseconds")]
	pub created_on: DateTime<Utc>,

	/// When the task was started. If [`None`], the task hasn't been started yet.
	#[serde(default, with = "ts_milliseconds_option")]
	pub started_on: Option<DateTime<Utc>>,

	/// When the task was completed. If [`None`], the task hasn't been completed yet.
	#[serde(default, with = "ts_milliseconds_option")]
	pub completed_on: Option<DateTime<Utc>>,

	/// When the task was journaled. If [`None`], the task hasn't been journaled yet.
	#[serde(default, with = "ts_milliseconds_option")]
	pub journaled_on: Option<DateTime<Utc>>,
}

/// The complete state of a board.
#[derive(Clone, Default, Debug, Serialize, Deserialize)]
pub struct BoardState {
	/// The title of the board.
	pub title: String,
	/// The clients connected to the board.
	pub clients: HashSet<Uuid>,
	/// The tasks contained in the board.
	pub tasks: HashMap<Uuid, Task>,
	/// If the board is locked or not.
	pub locked: bool,
}


impl From<v1::BoardChange> for BoardChange {
	fn from(value: v1::BoardChange) -> Self {
		match value {
			v1::BoardChange::Title(title) => BoardChange::Title(title),
			v1::BoardChange::Task(id, opt) => BoardChange::Task(id, opt.map(|task| task.into())),
			v1::BoardChange::Connect(id) => BoardChange::Connect(id),
			v1::BoardChange::Disconnect(id) => BoardChange::Disconnect(id),
		}
	}
}

impl From<v1::Task> for Task {
	fn from(value: v1::Task) -> Self {
		Task {
			text: value.text,
			icon: value.icon,
			importance: value.importance,
			priority: value.priority,
			created_on: Utc::now(),
			started_on: match value.status {
				v1::TaskStatus::Unfinished => None,
				v1::TaskStatus::InProgress | v1::TaskStatus::Complete => Some(Utc::now()),
			},
			completed_on: match value.status {
				v1::TaskStatus::Unfinished | v1::TaskStatus::InProgress => None,
				v1::TaskStatus::Complete => Some(Utc::now()),
			},
			journaled_on: None,
		}
	}
}

impl BoardState {
	/// Apply a [`BoardChange`] to the [`BoardState`], merging the two.
	pub fn apply(&mut self, change: BoardChange) {
		match change {
			BoardChange::Title(title) => {
				self.title = title;
			}
			BoardChange::Task(uuid, Some(task)) => {
				self.tasks.insert(uuid, task);
			}
			BoardChange::Task(uuid, None) => {
				self.tasks.remove(&uuid);
			}
			BoardChange::Connect(uuid) => {
				self.clients.insert(uuid);
			}
			BoardChange::Disconnect(uuid) => {
				self.clients.remove(&uuid);
			}
			BoardChange::Lock(lock) => {
				self.locked = lock;
			}
			BoardChange::State(state) => {
				self.title = state.title;
				self.clients = state.clients;
				self.tasks = state.tasks;
			}
		}
	}
}
