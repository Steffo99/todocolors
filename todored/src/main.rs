use std::str::FromStr;

use axum::routing::{get, post};

pub mod outcome;
pub mod task;
pub(crate) mod config;
mod routes;
pub mod kebab;
pub mod proxy;

#[tokio::main]
async fn main() {
	pretty_env_logger::init();
	log::debug!("Logging initialized!");

	let rclient = redis::Client::open(&**config::REDIS_CONN)
		.expect("to be able to connect to Redis");

	let router = axum::Router::new()
		.route("/", get(routes::version_route))
		.route("/version", get(routes::version_route))
		.route("/", post(routes::healthcheck_route))
		.route("/healthcheck", post(routes::healthcheck_route))
		.route("/board/:board/ws", get(routes::board::board_websocket))
		.layer(axum::Extension(rclient))
		.layer(tower_http::cors::CorsLayer::new()
			.allow_origin(
				tower_http::cors::Any
			)
			.allow_headers([
				axum::http::header::AUTHORIZATION,
				axum::http::header::CONTENT_TYPE,
			])
			.allow_methods(
				tower_http::cors::Any
			)
		);

	log::info!("Starting web server!");
	axum::Server::bind(&std::net::SocketAddr::from_str(&config::AXUM_HOST).expect("AXUM_HOST to be a valid SocketAddr"))
		.serve(router.into_make_service())
		.await
		.expect("to be able to run the Axum server");
}
