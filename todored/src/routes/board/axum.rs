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
	let handle_redis = rclient.get_async_connection().await;
	if handle_redis.is_err() {
		log::error!("Could not open Redis connection for the handler.");
		return Err::<(), StatusCode>(StatusCode::INTERNAL_SERVER_ERROR).into_response()
	}
	let mut handle_redis = handle_redis.unwrap();
	log::trace!("Created Redis connection for the main thread!");

	let count = *crate::config::TODORED_RATE_LIMIT_CONNECTIONS;
	log::trace!("TODORED_RATE_LIMIT_CONNECTIONS is {count}.");
	if count > 0 {
		if proxy_opt.is_none() {
			log::error!("TODORED_RATE_LIMIT_CONNECTIONS is {count}, but a request has been received without the proxy headers!");
			return Err::<(), StatusCode>(StatusCode::BAD_GATEWAY).into_response();
		}
		let proxy = proxy_opt.unwrap();
		log::trace!("Checking X-Forwarded-For header...");
		let ip = proxy.r#for.ip();
		log::trace!("User's IP is: {ip}");
		let key = format!("limit:{{{ip}}}:connections");
		log::trace!("Rate-limiting key is: {key:?}");

		log::trace!("Running rate-limiting function...");
		let result = super::limit::rate_limit_by_key(&mut handle_redis, key, 1, count, 1).await;

		if result.is_err() {
			log::warn!("User with IP {ip} hit connection rate limit!");
			return Err::<(), StatusCode>(StatusCode::BAD_REQUEST).into_response()
		}
	}

	log::trace!("Received websocket request, upgrading...");
	upgrade_request.on_upgrade(|websocket| ws::handler(board, rclient, websocket))
}
