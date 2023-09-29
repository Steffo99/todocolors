pub mod structs;
pub mod stream;

pub(self) mod axum;
pub(self) mod ws;
pub(self) mod ws_receive;
pub(self) mod redis_xadd;
pub(self) mod redis_xread;
pub(self) mod ws_send;

pub(crate) use self::axum::handler as board_websocket;
