use axum::extract::ws::CloseCode;
use redis::AsyncCommands;
use redis::streams::{StreamReadOptions, StreamReadReply};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use crate::outcome::LoggableOutcome;
use crate::routes::board::stream::xread_to_vbc;
use crate::task::VersionedBoardChange::V2;
use crate::task::v2::{BoardChange, BoardState, Task};

/// A request sent from a client to the server to perform a [`BoardAction`] on a board.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BoardRequest {
	/// The Redis key to act on.
	pub key: String,
	/// The [`BoardAction`] to perform.
	pub action: BoardAction,
}

impl BoardRequest {
	pub(crate) async fn handle(self, rconn: &mut redis::aio::Connection) -> Result<(), CloseCode> {
		log::trace!("Handling BoardRequest: {self:?}");

		match self.action {
			BoardAction::Title(title) => {
				log::debug!("Setting board Title: {title:?}");
				let operation = V2(BoardChange::Title(title));
				let _id = operation.store_in_redis_stream(rconn, &self.key).await;
				Ok(())
			},
			BoardAction::Task(None, Some(task)) => {
				log::debug!("Creating Task: {task:?}");
				let id = Uuid::new_v4();
				log::trace!("Assigned id {id:?} to Task: {task:?}");
				let operation = V2(BoardChange::Task(id, Some(task)));
				let _id = operation.store_in_redis_stream(rconn, &self.key).await;
				Ok(())
			},
			BoardAction::Task(Some(id), Some(task)) => {
				log::debug!("Editing Task {id:?}: {task:?}");
				let operation = V2(BoardChange::Task(id, Some(task)));
				let _id = operation.store_in_redis_stream(rconn, &self.key).await;
				Ok(())
			},
			BoardAction::Task(Some(id), None) => {
				log::debug!("Deleting Task {id:?}...");
				let operation = V2(BoardChange::Task(id, None));
				let _id = operation.store_in_redis_stream(rconn, &self.key).await;
				Ok(())
			},
			BoardAction::Lock(lock) => {
				log::debug!("Setting board lock to: {lock:?}");
				let operation = V2(BoardChange::Lock(lock));
				let _id = operation.store_in_redis_stream(rconn, &self.key).await;
				Ok(())
			},
			BoardAction::Trim => {
				log::debug!("Trimming BoardChanges...");

				log::trace!("Instantiating default board...");
				let mut board = BoardState::default();

				log::trace!("Retrieving all events from Redis...");
				let r: StreamReadReply = rconn
					.xread_options(
						&[&self.key],
						&["0"],
						&StreamReadOptions::default()
					).await
					.log_err_to_error("Could not XREAD events from Redis")
					.map_err(|_| 1011u16)?;

				log::trace!("Processing events retrieved from Redis...");
				let (vec, _) = xread_to_vbc(r).await;
				vec
					.into_iter()
					.for_each(|vbc| {
						log::trace!("Upgrading event to the latest possible version...");
						let bc = vbc.to_latest_bc();
						board.apply(bc);
					});

				log::trace!("Storing new full board state in the Redis Stream...");
				let id = V2(BoardChange::State(board))
					.store_in_redis_stream(rconn, &self.key).await
					.log_err_to_error("Failed to store trimmed board")
					.map_err(|_| 1011u16)?;

				log::trace!("Trimming all other events from the board...");
				let trim_count = redis::cmd("XTRIM")
					.arg(&self.key)
					.arg("MINID")
					.arg(id)
					.query_async::<redis::aio::Connection, i64>(rconn).await
					.log_err_to_error("Failed to trim stream")
					.map_err(|_| 1011u16)?;

				log::debug!("Trimmed {trim_count:?} events from the Redis Stream.");

				Ok(())
			}
			_ => {
				log::warn!("Received unknown BoardRequest: {self:?}");
				Err(1003u16)
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
	/// Lock or unlock the board for editing.
	Lock(bool),
	/// Request the trimming of the board.
	Trim,
}
