// noinspection JSUnusedGlobalSymbols

import "./layout.css";
import {AppBody} from "@/app/AppBody"

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

import type {Metadata as NextMetadata} from "next"
import {default as React, ReactNode} from "react"


export const metadata: NextMetadata = {
	title: "Todoblue",
	description: "Self-hostable todo app",
}

export default function RootLayout({children}: { children: ReactNode }) {
	return (
		<html lang="en">
			<AppBody>
				{children}
			</AppBody>
		</html>
	)
}
