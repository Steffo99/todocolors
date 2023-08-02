"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useEffect} from "react"
import {useBoardWebSocket} from "@/app/board/[board]/useBoardWebSocket"
import style from "./page.module.css";
import classNames from "classnames"
import {faHouse, faPencil, faTableColumns, faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons"


export default function Page({params: {board}}: {params: {board: string}}) {
	const {tasks, title, pushEvent, readyState} = useBoardWebSocket(board);

	useEffect(() => {
		console.debug("[Page] Current events: ", tasks)
	}, [tasks])

	return <>
		<header className={style.boardHeader}>
			<div className={classNames(style.boardButtons, style.boardButtonsLeft)}>
				<button title={"Home"}>
					<FontAwesomeIcon icon={faHouse}/>
				</button>
				<button title={"Modifica titolo"}>
					<FontAwesomeIcon icon={faPencil}/>
				</button>
			</div>
			<h1 className={style.boardTitle}>
				{title}
			</h1>
			<div className={classNames(style.boardButtons, style.boardButtonsRight)}>
				<button title={"Cambia raggruppamento orizzontale"}>
					<FontAwesomeIcon icon={faTableColumns}/>
				</button>
				<button title={"Cambia ordinamento verticale"}>
					<FontAwesomeIcon icon={faArrowDownWideShort}/>
				</button>
			</div>
		</header>
		<main>
			<div className={"chapter-5"}>
				<div>
					<h2>
						Gruppo A
					</h2>
				</div>
				<div>
					<h2>
						Gruppo B
					</h2>
				</div>
				<div>
					<h2>
						Gruppo C
					</h2>
				</div>
				<div>
					<h2>
						Gruppo D
					</h2>
				</div>
				<div>
					<h2>
						Gruppo E
					</h2>
				</div>
			</div>
		</main>
		<footer>
			sos
		</footer>
	</>
}
