use micronfig::required;

required!(REDIS_CONN, String);
required!(AXUM_HOST, String);  // FIXME: Use SocketAddr when possible
