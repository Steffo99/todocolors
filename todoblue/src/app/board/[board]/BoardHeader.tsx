import style from "./BoardHeader.module.css"
import {useBoardContext} from "@/app/board/[board]/useBoardContext"
import {faArrowDownWideShort, faHouse, faPencil, faTableColumns} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"


export function BoardHeader() {
	const {title, isEditingTitle, editTitle, setEditTitle, toggleEditingTitle, nextGrouper, nextSorter, websocketState} = useBoardContext();

	const isReady = websocketState === WebSocket.OPEN

	return (
		<header className={style.boardHeader}>
			<div className={cn(style.boardButtons, style.boardButtonsLeft)}>
				<button title={"Home"}>
					<FontAwesomeIcon icon={faHouse}/>
				</button>
				<button className={cn({fade: !isReady})} disabled={!isReady} title={"Modifica titolo"} onClick={isReady ? toggleEditingTitle : undefined}>
					<FontAwesomeIcon icon={faPencil}/>
				</button>
			</div>
			<h1 className={cn({fade: !isReady, [style.boardTitle]: true})}>
				{isEditingTitle ?
					<input type={"text"} placeholder={"Titolo"} onChange={(e) => setEditTitle(e.target.value)} value={editTitle}/>
				:
					<div>{title}</div>
				}
			</h1>
			<div className={cn(style.boardButtons, style.boardButtonsRight)}>
				<button title={"Cambia raggruppamento orizzontale"} onClick={nextGrouper}>
					<FontAwesomeIcon icon={faTableColumns}/>
				</button>
				<button title={"Cambia ordinamento verticale"} onClick={nextSorter}>
					<FontAwesomeIcon icon={faArrowDownWideShort}/>
				</button>
			</div>
		</header>
	)
}
