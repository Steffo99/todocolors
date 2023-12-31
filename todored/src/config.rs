use micronfig::{required, optional};
use crate::proxy::ReverseProxyInfoList;

required!(REDIS_CONN, String);
required!(AXUM_HOST, String);  // FIXME: Use SocketAddr when possible
optional!(AXUM_XFORWARDED, ReverseProxyInfoList);
required!(TODORED_RATE_LIMIT_CONNECTIONS_PER_MINUTE, usize);
required!(TODORED_RATE_LIMIT_MESSAGES_PER_MINUTE, usize);
