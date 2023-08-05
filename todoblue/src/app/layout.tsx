// noinspection JSUnusedGlobalSymbols

import "./layout.css";
import {AppBody} from "@/app/AppBody"
import type {Metadata as NextMetadata} from "next"
import {default as React, ReactNode} from "react"

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


export const metadata: NextMetadata = {
	applicationName: "Todoblue",
	title: "Home",
	description: "Self-hosted multiplayer todo app",
	viewport: {userScalable: false}
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
