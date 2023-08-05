"use client";

import style from "@/app/page.module.css"
import {useServersideConfiguration} from "@/app/ServersideConfigurationManager"
import {default as React} from "react"


export function RootHeader() {
	const {siteName} = useServersideConfiguration()

	return (
		<header className={style.pageHeader}>
			<h1>
				{siteName}
			</h1>
		</header>
	)
}
