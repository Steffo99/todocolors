// noinspection JSUnusedGlobalSymbols

import "./layout.css";
import {AppBody} from "@/app/AppBody"
import type {Metadata as NextMetadata} from "next"
import {default as React, ReactNode} from "react"

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


export const metadata: NextMetadata = {
	applicationName: "Todoblue",
	title: "Todocolors",
	description: "Self-hosted multiplayer todo app",
	viewport: {initialScale: 1, width: "device-width", userScalable: false},
	creator: "Steffo",
	robots: "noindex, nofollow",
	manifest: "manifest.json",
	icons: "favicon.ico"
}

export default function layout({children}: { children: ReactNode }) {
	return (
		<html lang="en">
			<AppBody>
				{children}
			</AppBody>
		</html>
	)
}
