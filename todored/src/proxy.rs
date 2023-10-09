use std::net::IpAddr;
use std::str::FromStr;
use axum::async_trait;
use axum::extract::FromRequestParts;
use axum::http::request::Parts;
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
	pub r#for: IpAddr,
	pub info: ReverseProxyInfo,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ExtractReverseProxyOption ( pub Option<ExtractReverseProxy> );

#[async_trait]
impl<S> FromRequestParts<S> for ExtractReverseProxyOption where S: Send + Sync {
	type Rejection = ResponseError;

	// TODO: Pending a security audit, as in second thought this doesn't seem so secure...
	async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
		log::debug!("Extracting reverse proxy headers...");

		log::trace!("Getting authorized proxy list...");
		let proxy_list = config::AXUM_XFORWARDED.clone();

		// Reverse proxying is not configured
		log::trace!("Making sure a proxy list has been defined...");
		if proxy_list.is_none() {
			log::trace!("No authorized proxies have been defined, extracting None...");
			return Ok(ExtractReverseProxyOption(None))
		}

		let proxy_list = proxy_list.unwrap().0;
		log::trace!("Authorized proxies are: {proxy_list:?}");

		log::trace!("Parsing X-Forwarded headers...");
		let r#for = parts.headers.get("X-Forwarded-For");
		log::trace!("Raw X-Forwarded-For: {:?}", r#for);
		let proto = parts.headers.get("X-Forwarded-Proto");
		log::trace!("Raw X-Forwarded-Proto: {:?}", proto);
		let host = parts.headers.get("X-Forwarded-Host");
		log::trace!("Raw X-Forwarded-For: {:?}", host);

		// Accessing the server without a reverse proxy
		log::trace!("Checking for presence of headers...");
		if r#for.is_none() || proto.is_none() || host.is_none() {
			log::warn!("X-Forwarded headers are missing, extracting None...");
			return Ok(ExtractReverseProxyOption(None))
		}

		log::trace!("Converting X-Forwarded headers to &str...");
		let r#for = r#for.unwrap().to_str();
		log::trace!("Stringified X-Forwarded-For: {:?}", r#for);
		let proto = proto.unwrap().to_str();
		log::trace!("Stringified X-Forwarded-Proto: {:?}", proto);
		let host = host.unwrap().to_str();
		log::trace!("Stringified X-Forwarded-For: {:?}", host);

		// Control characters in X-Forwarded headers
		log::trace!("Checking for control characters...");
		if r#for.is_err() || proto.is_err() || host.is_err() {
			log::warn!("X-Forwarded headers have invalid characters in them, extracting None...");
			return Ok(ExtractReverseProxyOption(None))
		}

		log::trace!("Cloning X-Forwarded headers...");
		let r#for = r#for.unwrap().to_string();
		let proto = proto.unwrap().to_string();
		let host = host.unwrap().to_string();

		log::trace!("Constructing ReverseProxyInfo...");
		let info = ReverseProxyInfo { proto, host };
		log::trace!("Constructed ReverseProxyInfo: {info:?}");

		// X-Forwarded-Host is not authorized
		log::trace!("Checking if proxy is authorized...");
		if !proxy_list.contains(&info) {
			log::warn!("X-Forwarded-Host is not an authorized proxy, extracting None...");
			return Ok(ExtractReverseProxyOption(None))
		}

		log::trace!("Parsing X-Forwarded-For as a IpAddr...");
		let r#for = r#for.parse::<IpAddr>();

		// X-Forwarded-For is not a valid IP address
		log::trace!("Making sure X-Forwarded-For is a valid SocketAddr...");
		if r#for.is_err() {
			log::warn!("X-Forwarded-For is not a valid SocketAddr, extracting None...");
			return Ok(ExtractReverseProxyOption(None))
		}

		let r#for = r#for.unwrap();
		log::trace!("Parsing X-Forwarded-For as: {:?}", r#for);

		log::trace!("Constructing result...");
		let result = Ok(ExtractReverseProxyOption(Some(ExtractReverseProxy { r#for, info })));
		log::debug!("Extracted reverse proxy headers as: {result:?}");

		result
	}
}
