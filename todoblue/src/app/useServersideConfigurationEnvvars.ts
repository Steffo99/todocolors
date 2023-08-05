import "server-only";
import {ServersideConfiguration} from "@/app/ServersideConfigurationManager"


export function useServersideConfigurationEnvvars(): ServersideConfiguration {
	const siteName = process.env["TODOBLUE_SITE_NAME"]
	const baseURL = process.env["TODORED_BASE_URL"]

	if(!siteName) {
		throw Error("TODOBLUE_SITE_NAME is not set.")
	}
	if(!baseURL) {
		throw Error("TODORED_BASE_URL is not set.")
	}

	return {siteName, baseURL}
}
