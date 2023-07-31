//! Module containing various utility type and trait definitions related to error handling.

use std::fmt::Debug;
use axum::http::StatusCode;

pub type ResponseError = StatusCode;
pub type Response<T> = Result<T, ResponseError>;

/// Trait to easily [`log`] function outcomes.
pub(crate) trait LoggableOutcome {
	fn log_err_to_trace(self, msg: &str) -> Self;
	fn log_err_to_debug(self, msg: &str) -> Self;
	fn log_err_to_info(self, msg: &str) -> Self;
	fn log_err_to_warn(self, msg: &str) -> Self;
	fn log_err_to_error(self, msg: &str) -> Self;
}

impl<T, E> LoggableOutcome for Result<T, E> where E: Debug {
	fn log_err_to_trace(self, msg: &str) -> Self {
		self.map_err(|err| {
			log::trace!("{msg}: {err:?}");
			err
		})
	}

	fn log_err_to_debug(self, msg: &str) -> Self {
		self.map_err(|err| {
			log::debug!("{msg}: {err:?}");
			err
		})
	}

	fn log_err_to_info(self, msg: &str) -> Self {
		self.map_err(|err| {
			log::info!("{msg}: {err:?}");
			err
		})
	}

	fn log_err_to_warn(self, msg: &str) -> Self {
		self.map_err(|err| {
			log::warn!("{msg}: {err:?}");
			err
		})
	}

	fn log_err_to_error(self, msg: &str) -> Self {
		self.map_err(|err| {
			log::error!("{msg}: {err:?}");
			err
		})
	}
}

impl<T> LoggableOutcome for Option<T> {
	fn log_err_to_trace(self, msg: &str) -> Self {
		if self.is_none() {
			log::trace!("{msg}");
		}
		self
	}

	fn log_err_to_debug(self, msg: &str) -> Self {
		if self.is_none() {
			log::debug!("{msg}");
		}
		self
	}

	fn log_err_to_info(self, msg: &str) -> Self {
		if self.is_none() {
			log::info!("{msg}");
		}
		self
	}

	fn log_err_to_warn(self, msg: &str) -> Self {
		if self.is_none() {
			log::warn!("{msg}");
		}
		self
	}

	fn log_err_to_error(self, msg: &str) -> Self {
		if self.is_none() {
			log::error!("{msg}");
		}
		self
	}

}
