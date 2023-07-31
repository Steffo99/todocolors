use axum::Extension;
use axum::extract::{Path, WebSocketUpgrade};
use super::ws;

pub(crate) async fn handler(
	Path(board): Path<String>,
	Extension(rclient): Extension<redis::Client>,
	upgrade_request: WebSocketUpgrade,
) -> axum::response::Response {
	log::trace!("Received websocket request, upgrading...");
	upgrade_request.on_upgrade(|websocket| ws::handler(board, rclient, websocket))
}
