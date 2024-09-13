use std::collections::{HashMap, HashSet};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use chrono::serde::{ts_milliseconds, ts_milliseconds_option};
use uuid::Uuid;
use super::v2;

pub use v2::TaskImportance;
pub use v2::TaskPriority;


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
	pub icon: String,
	
	#[serde(default)]
	pub importance: TaskImportance,
	
	#[serde(default, with = "ts_milliseconds_option")]
	pub deadline: Option<DateTime<Utc>>,
	
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

impl From<v2::BoardChange> for BoardChange {
	fn from(value: v2::BoardChange) -> Self {
		match value {
			v2::BoardChange::Title(title) => BoardChange::Title(title),
			v2::BoardChange::Task(id, opt) => BoardChange::Task(id, opt.map(|task| task.into())),
			v2::BoardChange::Connect(id) => BoardChange::Connect(id),
			v2::BoardChange::Disconnect(id) => BoardChange::Disconnect(id),
			v2::BoardChange::Lock(value) => BoardChange::Lock(value),
			v2::BoardChange::State(state) => {
				let tasks: HashMap<Uuid, Task> = state.tasks.into_iter().map(|(u, t)| (u, t.into())).collect();
				let state = BoardState {
					title: state.title,
					clients: state.clients,
					locked: state.locked,
					tasks,
				};
				BoardChange::State(state)
			}
		}
	}
}

impl From<v2::Task> for Task {
	fn from(value: v2::Task) -> Self {
		Self {
			text: value.text,
			icon: match value.icon {
				v2::TaskIcon::User => "user",
				v2::TaskIcon::Image => "image",
				v2::TaskIcon::Envelope => "envelope",
				v2::TaskIcon::Star => "star",
				v2::TaskIcon::Heart => "heart",
				v2::TaskIcon::Comment => "comment",
				v2::TaskIcon::FaceSmile => "face-smile",
				v2::TaskIcon::File => "file",
				v2::TaskIcon::Bell => "bell",
				v2::TaskIcon::Bookmark => "bookmark",
				v2::TaskIcon::Eye => "eye",
				v2::TaskIcon::Hand => "hand",
				v2::TaskIcon::PaperPlane => "paper-plane",
				v2::TaskIcon::Handshake => "handshake",
				v2::TaskIcon::Sun => "sun",
				v2::TaskIcon::Clock => "clock",
				v2::TaskIcon::Circle => "circle",
				v2::TaskIcon::Square => "square",
				v2::TaskIcon::Building => "building",
				v2::TaskIcon::Flag => "flag",
				v2::TaskIcon::Moon => "moon",
			}.to_string(),
			importance: value.importance,
			deadline: None,
			created_on: value.created_on,
			started_on: value.started_on,
			completed_on: value.completed_on,
			journaled_on: value.journaled_on,
		}
	}
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
