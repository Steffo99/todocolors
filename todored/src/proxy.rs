use std::net::SocketAddr;
use std::str::FromStr;
use axum::async_trait;
use axum::extract::FromRequestParts;
use axum::http::request::Parts;
use axum::http::StatusCode;
use crate::config;
use crate::outcome::ResponseError;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ReverseProxyInfo {
	pub proto: String,
	pub host: String,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ReverseProxyInfoList ( Vec<ReverseProxyInfo> );

impl FromStr for ReverseProxyInfoList {
	type Err = ();

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		let vec = s
			.split('|')
			.filter_map(|urlsplit| {
				match urlsplit.split_once("://") {
					Some((proto, host)) => Some(ReverseProxyInfo {
						proto: proto.to_owned(),
						host: host.to_owned()
					}),
					_ => None,
				}
			})
			.collect();

		Ok(ReverseProxyInfoList(vec))
	}
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ExtractReverseProxy {
	pub r#for: SocketAddr,
	pub info: ReverseProxyInfo,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ExtractReverseProxyOption ( Option<ExtractReverseProxy> );

#[async_trait]
impl<S> FromRequestParts<S> for ExtractReverseProxyOption where S: Send + Sync {
	type Rejection = ResponseError;

	async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
		let proxy_list = config::AXUM_XFORWARDED.clone();

		// Reverse proxying is not configured
		if proxy_list.is_none() {
			return Ok(ExtractReverseProxyOption(None))
		}

		let proxy_list = proxy_list.unwrap().0;

		let r#for = parts.headers.get("X-Forwarded-For");
		let proto = parts.headers.get("X-Forwarded-Proto");
		let host = parts.headers.get("X-Forwarded-Host");

		// Accessing the server without a reverse proxy
		if r#for.is_none() || proto.is_none() || host.is_none() {
			// TODO: Should this return None instead?
			return Err(StatusCode::BAD_GATEWAY)
		}

		let r#for = r#for.unwrap().to_str();
		let proto = proto.unwrap().to_str();
		let host = host.unwrap().to_str();

		// Control characters in X-Forwarded headers
		if r#for.is_err() || proto.is_err() || host.is_err() {
			return Err(StatusCode::BAD_GATEWAY)
		}

		let r#for = r#for.unwrap().to_string();
		let proto = proto.unwrap().to_string();
		let host = host.unwrap().to_string();

		let info = ReverseProxyInfo { proto, host };

		// X-Forwarded-Host is not authorized
		if !proxy_list.contains(&info) {
			return Err(StatusCode::BAD_GATEWAY)
		}

		let r#for = r#for.parse::<SocketAddr>();

		// X-Forwarded-For is not a valid IP address
		if r#for.is_err() {
			return Err(StatusCode::BAD_GATEWAY)
		}

		let r#for = r#for.unwrap();

		Ok(ExtractReverseProxyOption(Some(ExtractReverseProxy { r#for, info })))
	}
}
