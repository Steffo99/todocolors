use axum::Extension;
use axum::extract::{Path, WebSocketUpgrade};
use uuid::Uuid;
use crate::kebab::Skewer;
use crate::routes::board::structs::{BoardAction};
use crate::task::{Task, TaskIcon, TaskImportance, TaskPriority, TaskStatus};
use super::ws;

pub(crate) async fn handler(
	Path(board): Path<String>,
	Extension(rclient): Extension<redis::Client>,
	upgrade_request: WebSocketUpgrade,
) -> axum::response::Response {
	log::trace!("Kebabifying board name...");
	let board = board.to_kebab_lowercase();
	log::trace!("Kebabified board name to: {board:?}");

	log::info!("{}", serde_json::ser::to_string(&BoardAction::Task(Some(Uuid::new_v4()), Some(Task { text: "Hello world".to_string(), icon: TaskIcon::Bell, importance: TaskImportance::High, priority: TaskPriority::Highest, status: TaskStatus::Complete }))).unwrap());

	log::trace!("Received websocket request, upgrading...");
	upgrade_request.on_upgrade(|websocket| ws::handler(board, rclient, websocket))
}
