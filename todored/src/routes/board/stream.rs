use redis::streams::StreamReadReply;
use crate::task::{v1, VersionedBoardChange};


pub async fn xread_to_vbc(r: StreamReadReply) -> (Vec<VersionedBoardChange>, String) {
	log::trace!("Making sure that the Redis Stream existed...");
	let r = r.keys.get(0);

	let mut current_id: String = "0".to_string();

	if r.is_none() {
		log::trace!("Stream does not exist yet, returning an empty vec...");
		return (Vec::new(), current_id);
	}

	let r: Vec<VersionedBoardChange> = r.unwrap().ids.iter().filter_map(|id| {
		log::trace!("Updating current id...");
		current_id = id.id.clone();
		log::trace!("Updated current id to: {current_id:?}");

		log::trace!("Trying to access the `change` field of the event...");
		let stream = id.map.get("change");

		let value = match stream {
			Some(value) => value,
			None => {
				log::warn!("Event does not have required `change` field, skipping: {id:?}");
				return None;
			}
		};

		log::trace!("Making sure the value is a blob of data...");
		let blob = match value {
			redis::Value::Data(data) => data,
			_ => {
				log::warn!("Event contains unexpected data type in the `change` field, skipping: {value:?}");
				return None;
			}
		};

		let vbc: VersionedBoardChange = match serde_json::de::from_slice(blob) {
			Ok(vbc) => vbc,
			Err(err) => {
				log::trace!("Could not deserialize event as vbc: {err:?}");
				log::trace!("Trying to deserialize as bc V1...");
				let bc: v1::BoardChange = match serde_json::de::from_slice(blob) {
					Ok(bc) => bc,
					Err(err) => {
						log::warn!("Event data could not be deserialized, skipping: {err:?}");
						return None;
					}
				};
				VersionedBoardChange::V1(bc)
			}
		};

		Some(vbc)
	}).collect();

	(r, current_id)
}
