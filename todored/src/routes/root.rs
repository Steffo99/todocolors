use axum::{Extension, Json};
use axum::http::StatusCode;

use crate::utils::{RedisConnectOr500, RedisUnwrapOr500, Result};

const MAJOR: u32 = pkg_version::pkg_version_major!();
const MINOR: u32 = pkg_version::pkg_version_minor!();
const PATCH: u32 = pkg_version::pkg_version_patch!();

fn compose_version() -> String {
	format!("{}.{}.{}", MAJOR, MINOR, PATCH)
}


pub async fn version() -> Json<String> {
	Json(compose_version())
}

pub async fn healthcheck(
	Extension(rclient): Extension<redis::Client>
) -> Result<Json<String>> {
	let mut rconn = rclient.get_connection_or_500().await?;

	log::trace!("Sending PING...");
	let response = redis::cmd("PING")
		.query_async::<redis::aio::Connection, String>(&mut rconn).await
		.unwrap_or_500_and_log()?;

	log::trace!("Sent PING and received: {:?}", response);

	match response == "PONG" {
		false => Err(StatusCode::INTERNAL_SERVER_ERROR),
		true => Ok(Json(compose_version())),
	}
}
