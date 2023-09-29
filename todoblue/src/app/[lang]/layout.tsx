// noinspection JSUnusedGlobalSymbols

import {StarredProvider} from "@/app/[lang]/(layout)/(contextStarred)/StarredProvider"
import {Body} from "@/app/[lang]/(layout)/Body"

import {config} from "@fortawesome/fontawesome-svg-core"
import type {Metadata as NextMetadata} from "next"
import {default as React, ReactNode} from "react"
import "./layout.css"


config.autoAddCss = false;


export const metadata: NextMetadata = {
	applicationName: "Todocolors",
	title: "Todocolors",
	description: "Self-hosted multiplayer todo app",
	viewport: {initialScale: 1, width: "device-width", userScalable: false},
	creator: "Steffo",
	robots: "noindex, nofollow",
	manifest: "/manifest.json",
	icons: "/favicon-wbg.ico",
	themeColor: "#0d193b"
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
