"use client";

import {useClientTranslation} from "@/app/(i18n)/client"
import {useStarredConsumer} from "@/app/[lang]/(layout)/(contextStarred)"
import {fas} from "@awesome.me/kit-dfe340c874/icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import Link from "next/link"
import {useEffect, useState} from "react"


export function StarredBoardsPanel({lang}: {lang: string}) {
	const {t} = useClientTranslation(lang, "root")
	const [isClient, setIsClient] = useState<true | null>(null);
	const {starred} = useStarredConsumer()

	useEffect(() => setIsClient(true), [])

	let content;
	if(!isClient) {
		content = <>
			<p>
				{t("existingStarredBoardsLoadingDescription")}
				<br/>
				<small>
					{t("existingStarredBoardsLoadingSmall")}
				</small>
			</p>
		</>
	}
	else if(starred.length === 0) {
		content = <>
			<p>
				{t("existingStarredBoardsEmptyDescription")}
				<br/>
				<small>
					{t("existingStarredBoardsEmptySmall")}
				</small>
			</p>
		</>
	}
	else {
		content = <>
			<p>
				{t("existingStarredBoardsDescription")}
				<br/>
				<small>
					{t("existingStarredBoardsSmall")}
				</small>
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
		})}>
			<h3>
				<FontAwesomeIcon icon={fas.faStar}/>
				{" "}
				{t("existingStarredBoardsTitle")}
			</h3>
			{content}
		</div>
	)
}
