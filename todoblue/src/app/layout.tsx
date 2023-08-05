// noinspection JSUnusedGlobalSymbols

import "./layout.css";
import {AppBody} from "@/app/AppBody"
import {ServersideConfigurationManager} from "@/app/ServersideConfigurationManager"
import {useServersideConfigurationEnvvars} from "@/app/useServersideConfigurationEnvvars"
import type {Metadata as NextMetadata} from "next"
import {default as React, ReactNode} from "react"

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


export const metadata: NextMetadata = {
	applicationName: process.env["TODOBLUE_SITE_NAME"] ?? "Todoblue",
	title: "Home",
	description: process.env["TODOBLUE_SITE_DESCRIPTION"] ?? "Self-hosted multiplayer todo app",
	viewport: {userScalable: false}
}

export default function layout({children}: { children: ReactNode }) {
	const serversideConfiguration = useServersideConfigurationEnvvars()

	return (
		<html lang="en">
			<ServersideConfigurationManager value={serversideConfiguration}>
				<AppBody>
					{children}
				</AppBody>
			</ServersideConfigurationManager>
		</html>
	)
}
