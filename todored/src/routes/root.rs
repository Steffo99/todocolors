use axum::{Extension, Json};
use axum::http::StatusCode;

use crate::outcome::{Response, LoggableOutcome};

const MAJOR: u32 = pkg_version::pkg_version_major!();
const MINOR: u32 = pkg_version::pkg_version_minor!();
const PATCH: u32 = pkg_version::pkg_version_patch!();

fn compose_version() -> String {
	format!("{}.{}.{}", MAJOR, MINOR, PATCH)
}


pub async fn version() -> Response<Json<String>> {
	Ok(Json(compose_version()))
}

pub async fn healthcheck(
	Extension(rclient): Extension<redis::Client>
) -> Response<Json<String>> {
	let mut rconn = rclient.get_async_connection().await
		.log_err_to_error("Failed to connect to Redis")
		.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

	log::trace!("Sending PING...");
	let response = redis::cmd("PING")
		.query_async::<redis::aio::Connection, String>(&mut rconn).await
		.log_err_to_error("Failed to PING Redis")
		.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

	log::trace!("Sent PING and received: {:?}", response);
	response.eq("PONG")
		.then_some(())
		.log_err_to_error("Received invalid PONG from Redis")
		.ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;

	Ok(Json(compose_version()))
}
