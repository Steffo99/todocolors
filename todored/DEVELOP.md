# Development

## Prerequisites

To run `todored` locally for development, the following software must be installed on your machine:
- [Rust](https://rust-lang.org/)
   - `rustc`
   - `cargo`
- [Redis](https://redis.io)
  - `redis-cli`

## Flusing Redis database

To prevent keys from conflicting with each other, make sure the Redis database is empty by entering the following command via `redis-cli`:

> [#WARNING]
> This will wipe all data in your Redis instance!

```redis
FLUSHDB
```

## Configuration

Before `todored` can run, the following environment variables must be configured:

```dotenv
# The socket address to bind the HTTP server at.
AXUM_HOST=0.0.0.0:8080
# The address where Redis is reachable at.
REDIS_CONN=redis://127.0.0.1:6379/
# The amount of logging to print to console.
# RECOMMENDED: entering "todored" will print everything from the crate to the console
RUST_LOG=todored
# Don't set AXUM_XFORWARDED to denote you're not using a reverse proxy
# Disable all rate limits by setting these variables to 0
TODORED_RATE_LIMIT_CONNECTIONS_PER_MINUTE=0
TODORED_RATE_LIMIT_MESSAGES_PER_MINUTE=0
```

## Installing dependencies and running

`cargo` automatically handles the crate's dependencies, so the debug binary can be run directly with:

```console
$ cargo run
```

A HTTP server will become available at `:8080` (unless you changed `AXUM_HOST` to something different).

## Linting

`cargo` supports extended linting via:

```console
$ cargo clippy
```
