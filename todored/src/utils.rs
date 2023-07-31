use std::fmt::Debug;
use async_trait::async_trait;
use axum::http::StatusCode;

pub type Result<T> = std::result::Result<T, StatusCode>;

pub(crate) trait UnwrapOr500<T, E> {
	fn unwrap_or_500(self) -> Result<T>;
	fn unwrap_or_500_and_log(self) -> Result<T> where E: Debug;
	fn expect_or_500_and_log(self, text: &str) -> Result<T> where E: Debug;
}

impl<T, E> UnwrapOr500<T, E> for std::result::Result<T, E> {
	fn unwrap_or_500(self) -> Result<T> {
		self.or(Err(StatusCode::INTERNAL_SERVER_ERROR))
	}

	fn unwrap_or_500_and_log(self) -> Result<T> where E: Debug {
		self.map_err(|e| {
			log::error!("{e:?}");
			e
		}).unwrap_or_500()
	}

	fn expect_or_500_and_log(self, text: &str) -> Result<T> where E: Debug {
		self.map_err(|e| {
			log::error!("{text}: {e:?}");
			e
		}).unwrap_or_500()
	}
}

#[async_trait]
pub(crate) trait RedisConnectOr500 {
	async fn get_connection_or_500(&self) -> Result<redis::aio::Connection>;
}

#[async_trait]
impl RedisConnectOr500 for redis::Client {
	async fn get_connection_or_500(&self) -> Result<redis::aio::Connection> {
		log::trace!("Connecting to Redis...");

		let rconn = self.get_async_connection().await
			.expect_or_500_and_log("Failed to connect to Redis")?;

		log::trace!("Connection successful!");
		Ok(rconn)
	}
}
