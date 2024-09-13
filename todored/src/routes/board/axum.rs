use axum::{Extension};
use axum::extract::{Path, WebSocketUpgrade};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use crate::kebab::Skewer;
use crate::proxy::ExtractReverseProxyOption;
use super::ws;

pub(crate) async fn handler(
	Path(board): Path<String>,
	Extension(rclient): Extension<redis::Client>,
	ExtractReverseProxyOption(proxy_opt): ExtractReverseProxyOption,
	upgrade_request: WebSocketUpgrade,
) -> axum::response::Response {
	log::trace!("Kebabifying board name...");
	let board = board.to_kebab_lowercase();
	log::trace!("Kebabified board name to: {board:?}");

	log::trace!("Creating Redis connection for the handler...");
	let rconn = rclient.get_async_connection().await;
	if rconn.is_err() {
		log::error!("Could not open Redis connection for the handler.");
		return Err::<(), StatusCode>(StatusCode::INTERNAL_SERVER_ERROR).into_response()
	}
	let mut handle_redis = rconn.unwrap();
	log::trace!("Created Redis connection for the main thread!");

	let rate_limit_key = match proxy_opt {
		None => {
			log::warn!("Reverse proxying has not been detected, rate-limiting is disabled.");
			None
		}
		Some(proxy) => {
			log::debug!("Reverse proxying has been detected, rate-limiting is enabled.");
			let ip = proxy.r#for;
			log::trace!("User agent's IP is: {ip}");
			let key = format!("limit:{{{ip}}}:connections");
			log::trace!("Rate-limiting key is: {key:?}");
			Some(key)
		}
	};

	if let Some(rate_limit_key) = &rate_limit_key {
		let count = *crate::config::TODORED_RATE_LIMIT_CONNECTIONS_PER_MINUTE;
		log::trace!("Connection rate limit is: {count} / 60 s");
		if count > 0 {
			log::trace!("Checking rate limit...");
			let result = super::limit::rate_limit_by_key(&mut handle_redis, rate_limit_key, 1, count, 60).await;
			if result.is_err() {
				return Err::<(), StatusCode>(StatusCode::BAD_REQUEST).into_response()
			}
		}
	}

	log::trace!("Received websocket request, upgrading...");
	upgrade_request.on_upgrade(|websocket| ws::handler(board, rclient, websocket, rate_limit_key))
}
