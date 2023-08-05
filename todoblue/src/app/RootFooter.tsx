"use client";

import style from "@/app/page.module.css"
import {useServersideConfiguration} from "@/app/ServersideConfigurationManager"
import {default as React} from "react"


export function RootFooter() {
	const {baseURL} = useServersideConfiguration()

	return (
		<footer className={style.pageFooter}>
			<p>
				© <a href="https://steffo.eu">Stefano Pigozzi</a> -
				<a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPL 3.0</a> -
				<a href="https://github.com/Steffo99/todocolors">GitHub</a> -
				Using {baseURL}
			</p>
		</footer>
	)
}
