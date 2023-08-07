"use client";

import {useManagedStarred} from "@/app/StarContext"
import cn from "classnames"
import Link from "next/link"
import {useEffect, useState} from "react"


export function StarredBoardsPanel() {
	const [isClient, setIsClient] = useState<true | null>(null);
	const {starred} = useManagedStarred()

	useEffect(() => setIsClient(true), [])

	let content;
	if(!isClient) {
		content = <>
			<p>
				Sto recuperando i dati salvati sul tuo browser...
			</p>
		</>
	}
	else {
		content = <>
			<p>
				Puoi stellare un tabellone cliccando sulla stellina una volta che ci sei dentro.
			</p>
			{starred.length > 0 ?
			 <ul>
				 {starred.map(s => <li key={s}><Link href={`/board/${s}`}><code>{s}</code></Link></li>)}
			 </ul>
								:
			 <p className={"fade"}>
				 Non hai ancora stellato nessun tabellone.
			 </p>
			}
		</>
	}

	return (
		<div className={cn({
			"panel": true,
			"box": true,
			"fade": !isClient,
		})}>
			<h3>
				Tabelloni stellati
			</h3>
			{content}
		</div>
	)
}
