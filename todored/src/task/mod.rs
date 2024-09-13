//! Module with containers related to boards and tasks.

use serde::{Deserialize, Serialize};
use crate::outcome::LoggableOutcome;

pub mod v1;
pub mod v2;
pub mod v3;

pub use v3 as latest;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum VersionedBoardChange {
	V1(v1::BoardChange),
	V2(v2::BoardChange),
	V3(v3::BoardChange),
}

impl VersionedBoardChange {
	pub fn to_latest_bc(self) -> latest::BoardChange {
		match self {
			Self::V1(bc) => Self::V2(v2::BoardChange::from(bc)).to_latest_bc(),
			Self::V2(bc) => Self::V3(v3::BoardChange::from(bc)).to_latest_bc(),
			Self::V3(bc) => bc,
		}
	}

	pub fn to_latest(self) -> VersionedBoardChange {
		Self::V3(self.to_latest_bc())
	}
	
	pub fn new_latest(bc: latest::BoardChange) -> VersionedBoardChange {
		Self::V3(bc)
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
