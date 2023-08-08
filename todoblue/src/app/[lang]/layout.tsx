// noinspection JSUnusedGlobalSymbols

import "./layout.css";
import {Body} from "@/app/[lang]/(layout)/Body"
import {StarredProvider} from "@/app/[lang]/(layout)/(contextStarred)/StarredProvider"
import type {Metadata as NextMetadata} from "next"
import {default as React, ReactNode} from "react"

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


export const metadata: NextMetadata = {
	applicationName: "Todocolors",
	title: "Todocolors",
	description: "Self-hosted multiplayer todo app",
	viewport: {initialScale: 1, width: "device-width", userScalable: false},
	creator: "Steffo",
	robots: "noindex, nofollow",
	manifest: "manifest.json",
	icons: "favicon-wbg.ico"
}

export default function layout({children}: { children: ReactNode }) {
	return (
		<html lang="en">
			<Body>
				<StarredProvider>
					{children}
				</StarredProvider>
			</Body>
		</html>
	)
}
