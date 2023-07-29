// noinspection JSUnusedGlobalSymbols

import "@steffo/bluelib/dist/base.root.css"
import "@steffo/bluelib/dist/classic.root.css"
import "@steffo/bluelib/dist/glass.root.css"
import "@steffo/bluelib/dist/colors-royalblue.root.css"
import "@steffo/bluelib/dist/fonts-fira-ghpages.root.css"

import type {Metadata as NextMetadata} from "next"
import {ReactNode} from "react"


export const metadata: NextMetadata = {
	title: "Todoblue",
	description: "Self-hostable todo app",
}

export default function RootLayout({children}: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	)
}
