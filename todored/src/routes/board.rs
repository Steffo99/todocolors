use axum::Extension;
use axum::extract::{Path, WebSocketUpgrade};
use axum::extract::ws::{Message, WebSocket};
use futures_util::{SinkExt, stream::{StreamExt, SplitSink, SplitStream}};
use axum::response::Response;


pub(crate) async fn websocket(
    Path(board): Path<String>,
    Extension(rclient): Extension<redis::Client>,
    ws: WebSocketUpgrade,
) -> Response {
    log::trace!("Received websocket request, upgrading...");
    ws.on_upgrade(|socket| splitter(socket, rclient, board))
}

async fn splitter(
    socket: WebSocket,
    rclient: redis::Client,
    board: String,
) {
    log::trace!("Splitting socket into two separate pipes...");
    let (mut sender, receiver) = socket.split();

    log::trace!("Creating Redis connection for the reader thread...");
    let reader_redis = rclient.get_async_connection().await;
    if reader_redis.is_err() {
        log::error!("Could not open Redis connection for the reader thread.");
        let _ = sender.close().await;
        return;
    }
    let reader_redis = reader_redis.unwrap();
    log::trace!("Created Redis connection for the reader thread!");

    log::trace!("Creating Redis connection for the writer thread...");
    let writer_redis = rclient.get_async_connection().await;
    if writer_redis.is_err() {
        log::error!("Could not open Redis connection for the writer thread.");
        let _ = sender.close().await;
        return;
    }
    let writer_redis = writer_redis.unwrap();
    log::trace!("Created Redis connection for the writer thread!");

    let reader_thread = tokio::spawn(reader(receiver, reader_redis));
    let writer_thread = tokio::spawn(writer(sender, writer_redis));
}

async fn reader(
    receiver: SplitStream<WebSocket>,
    reader_redis: redis::aio::Connection,
) -> SplitStream<WebSocket> {
    log::trace!("Reader thread spawned successfully!");
    todo!()
}

async fn writer(
    mut sender: SplitSink<WebSocket, Message>,
    writer_redis: redis::aio::Connection,
) -> SplitSink<WebSocket, Message> {
    log::trace!("Writer thread spawned successfully!");

    log::trace!("Sending test message...");
    let _ = sender.send(Message::Text("\"Garasauto\"".to_string())).await;
    log::trace!("Sent test message!");

    todo!()
}