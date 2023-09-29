//! Module with containers related to boards and tasks.

use serde::{Deserialize, Serialize};
use crate::outcome::LoggableOutcome;

pub mod v1;
pub mod v2;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum VersionedBoardChange {
	V1(v1::BoardChange),
	V2(v2::BoardChange),
}

impl VersionedBoardChange {
	pub fn to_latest_bc(self) -> v2::BoardChange {
		match self {
			VersionedBoardChange::V1(bc) => bc.into(),
			VersionedBoardChange::V2(bc) => bc,
		}
	}

	pub fn to_latest_vbc(self) -> VersionedBoardChange {
		Self::V2(self.to_latest_bc())
	}

	pub(crate) async fn store_in_redis_stream(&self, rconn: &mut redis::aio::Connection, key: &str) -> Result<String, ()> {
		log::debug!("Storing VersionedBoardChange in Redis: {:?}", &self);

		log::trace!("Serializing VersionedBoardChange to JSON...");
		let change = serde_json::ser::to_string(self)
			.log_err_to_error("Failed to serialize BoardOperation")
			.map_err(|_| ())?;

		log::trace!("Adding to the Redis stream {key:?}...");
		let id = redis::cmd("XADD")
			.arg(key)
			.arg("*")
			.arg("change")
			.arg(change)
			.query_async::<redis::aio::Connection, String>(rconn).await
			.log_err_to_error("Failed to XADD to Redis")
			.map_err(|_| ())?;

		log::trace!("Added to Redis stream with id {id:?}!");
		Ok(id)
	}
}
