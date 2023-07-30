use async_trait::async_trait;
use axum::http::StatusCode;

pub type Result<T> = std::result::Result<T, StatusCode>;

pub(crate) trait RedisUnwrapOr500<T> {
	fn unwrap_or_500_and_log(self) -> Result<T>;
}

impl<T> RedisUnwrapOr500<T> for redis::RedisResult<T> {
	fn unwrap_or_500_and_log(self) -> Result<T> {
		self
			.map_err(|e| {
				log::error!("{e:#?}");
				e
			})
			.or(Err(StatusCode::INTERNAL_SERVER_ERROR))
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
			.unwrap_or_500_and_log()?;

		log::trace!("Connection successful!");
		Ok(rconn)
	}
}
