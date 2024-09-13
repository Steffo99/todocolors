pub mod board;
pub mod structs;

mod root;

pub(crate) use root::version as version_route;
pub(crate) use root::healthcheck as healthcheck_route;
