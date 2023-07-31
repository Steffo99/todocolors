use serde::{Deserialize, Serialize};
use uuid::Uuid;
use crate::task::{BoardChange, Task};

/// A request sent from a client to the server to perform a [`BoardAction`] on a board.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BoardRequest {
	/// The Redis key to act on.
	pub board: String,
	/// The [`BoardAction`] to perform.
	pub action: BoardAction,
}

impl BoardRequest {
	pub(crate) async fn handle(self, rconn: &mut redis::aio::Connection) {
		log::trace!("Handling BoardRequest: {self:?}");

		match self.action {
			BoardAction::Title(title) => {
				log::debug!("Setting board Title: {title:?}");
				let operation = BoardChange::Title(title);
				let _id = operation.store_in_redis(rconn, &self.board).await;
			},
			BoardAction::Task(None, Some(task)) => {
				log::debug!("Creating Task: {task:?}");
				let id = Uuid::new_v4();
				log::trace!("Assigned id {id:?} to Task: {task:?}");
				let operation = BoardChange::Task(id, Some(task));
				let _id = operation.store_in_redis(rconn, &self.board).await;
			},
			BoardAction::Task(Some(id), Some(task)) => {
				log::debug!("Editing Task {id:?}: {task:?}");
				let operation = BoardChange::Task(id, Some(task));
				let _id = operation.store_in_redis(rconn, &self.board).await;
			},
			BoardAction::Task(Some(id), None) => {
				log::debug!("Deleting Task {id:?}...");
				let operation = BoardChange::Task(id, None);
				let _id = operation.store_in_redis(rconn, &self.board).await;
			},
			_ => {
				log::warn!("Received unknown BoardRequest: {self:?}");
			}
		}
	}
}

/// An action that can be performed on a board.
#[derive(Clone, Debug, Serialize, Deserialize)]
#[non_exhaustive]
pub enum BoardAction {
	/// Set the board's title.
	Title(String),
	/// Create a new [`Task`], or update or delete the task with the given id.
	Task(Option<Uuid>, Option<Task>),
}
