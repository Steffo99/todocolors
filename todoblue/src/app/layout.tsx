// noinspection JSUnusedGlobalSymbols

import "@steffo/bluelib/dist/base.root.css"
import "@steffo/bluelib/dist/classic.root.css"
import "@steffo/bluelib/dist/glass.root.css"
import "@steffo/bluelib/dist/layouts-center.root.css"
import "@steffo/bluelib/dist/colors-royalblue.root.css"
import "@steffo/bluelib/dist/fonts-fira-ghpages.root.css"
import '@fortawesome/fontawesome-svg-core/styles.css';

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
			<body className={"theme-bluelib layout-center"}>
				{children}
				<footer>
					<p>
						© <a href="https://steffo.eu">Stefano Pigozzi</a> -
						<a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPL 3.0</a> -
						<a href="https://github.com/Steffo99/todocolors">GitHub</a> -
						Using {process.env.NEXT_PUBLIC_API_BASE_URL}
					</p>
				</footer>
			</body>
		</html>
	)
}
