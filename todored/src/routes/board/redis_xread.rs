use axum::extract::ws::{Message, WebSocket};
use futures_util::stream::SplitSink;

pub async fn handler(
	mut sender: SplitSink<WebSocket, Message>,
	mut rconn: redis::aio::Connection,
	board_name: &str,
) -> SplitSink<WebSocket, Message> {
	log::trace!("Writer thread spawned successfully!");

	log::trace!("Computing Redis key...");
	let stream_key = format!("board:{{{board}}}:stream");

	loop {
		let response = redis::cmd("XREAD")
			.arg(&stream_key)
			.arg("COUNT")
			.arg(1)
			.arg("BLOCK")
			.arg(30000)

	}

	log::trace!("Nothing to do, returning...");
	sender
}
