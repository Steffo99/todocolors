//! Rate limiting for board websocket.

use axum::extract::ws::CloseCode;
use redis::Connection;
use crate::outcome::LoggableOutcome;

pub fn rate_limit_by_key(
	mut rconn: Connection,
	key: String,
	increment: usize,
	limit: usize,
	expiration_s: usize
) -> Result<(), CloseCode> {
	log::trace!("Incrementing rate limit counter for {key:?}...");
	let response: usize = rconn.cmd("INCRBY")
		.arg(&key)
		.arg(increment)
		.log_err_to_error("Could not increase rate limit counter")
		.map_err(|_| 1011u16)?;

	log::trace!("Refreshing rate limit counter expiration for {key:?}...");
	rconn.cmd("EXPIRE")
		.arg(&key)
		.arg(expiration_s)
		.log_err_to_warn("Could not set expiration for rate limit counter");

	log::trace!("Checking rate limit of {limit} / {expiration_s} s for {key:?}...");
	if response > limit {
		log::warn!("Hit rate limit of {limit} / {expiration_s} s for {key:?}: counter is at {response}!");
		return Err(1008u16);
	}

	Ok(())
}
