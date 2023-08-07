import {CreatePrivateBoardPanel} from "@/app/CreatePrivateBoardPanel"
import {CreatePublicBoardPanel} from "@/app/CreatePublicBoardPanel"
import style from "@/app/page.module.css"
import {StarredBoardsPanel} from "@/app/StarredBoardsPanel"
import {default as React} from "react"


export function RootMain() {
	return (
		<main className={style.pageMain}>
			<div className={"chapter-2"}>
				<h2>
					Crea un nuovo tabellone
				</h2>
				<CreatePublicBoardPanel/>
				<CreatePrivateBoardPanel/>
			</div>
			<div className={"chapter-1"}>
				<h2>
					Usa un tabellone già esistente
				</h2>
				<StarredBoardsPanel/>
			</div>
		</main>
	)
}
