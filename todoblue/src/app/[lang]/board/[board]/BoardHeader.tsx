import {useManagedStarred} from "@/app/[lang]/StarContext"
import {useRouter} from "next/navigation"
import {ReactNode, useCallback} from "react"
import style from "./BoardHeader.module.css"
import {useManagedBoard} from "@/app/[lang]/board/[board]/BoardManager"
import {faArrowDownWideShort, faHouse, faPencil, faObjectGroup, faTableColumns, faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons"
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"


export function BoardHeader({className}: {className?: string}) {
	const {isEditingTitle} = useManagedBoard();

	return (
		<header className={cn(style.boardHeader, className)}>
			<TitleArea>
				{isEditingTitle ? <TitleInput/> : <TitleDisplay/>}
			</TitleArea>
			<LeftButtonsArea>
				<HomeButton/>
				<StarButton/>
				<EditTitleButton/>
			</LeftButtonsArea>
			<RightButtonsArea>
				<ToggleSingleColumnButton/>
				<CycleGroupButton/>
				<CycleSortButton/>
			</RightButtonsArea>
		</header>
	)
}

function TitleArea({children}: {children: ReactNode}) {
	return (
		<h1 className={style.titleArea}>
			{children}
		</h1>
	)
}

function TitleInput() {
	const {editTitle, setEditTitle, stopEditingTitle, webSocketState} = useManagedBoard()

	if(webSocketState !== WebSocket.OPEN) {
		return null
	}

	return (
		<form onSubmit={stopEditingTitle}>
			<input
				className={style.titleInput}
				type={"text"}
				placeholder={"Titolo"}
				onChange={(e) => setEditTitle(e.target.value)}
				value={editTitle}
			/>
		</form>
	)
}

function TitleDisplay() {
	const {title, webSocketState} = useManagedBoard()

	if(webSocketState !== WebSocket.OPEN) {
		return null
	}

	return (
		<div
			className={style.titleDisplay}
		>
			{title}
		</div>
	)
}

function LeftButtonsArea({children}: {children: ReactNode}) {
	return (
		<div
			className={cn(style.buttonsArea, style.leftButtonsArea)}
		>
			{children}
		</div>
	)
}

function HomeButton() {
	const router = useRouter()
	const goHome = useCallback(() => router.push("/"), [router])

	return (
		<button title={"Pagina principale"} onClick={goHome}>
			<FontAwesomeIcon icon={faHouse}/>
		</button>
	)
}

function StarButton() {
	const {name} = useManagedBoard()
	const {starred, addStarred, removeStarred} = useManagedStarred()
	const isStarred = starred.indexOf(name) >= 0

	const toggleStarred = useCallback(() => isStarred ? removeStarred(name) : addStarred(name), [name, isStarred, addStarred, removeStarred])

	return (
		<button title={"Stella tabellone"} onClick={toggleStarred}>
			<FontAwesomeIcon icon={isStarred ? faStarSolid : faStarRegular}/>
		</button>
	)
}

function EditTitleButton() {
	const {webSocketState, toggleEditingTitle} = useManagedBoard()

	if(webSocketState != WebSocket.OPEN) {
		return null;
	}

	return (
		<button title={"Modifica titolo"} onClick={toggleEditingTitle}>
			<FontAwesomeIcon icon={faPencil}/>
		</button>
	)
}

function RightButtonsArea({children}: {children: ReactNode}) {
	return (
		<div className={cn(style.buttonsArea, style.rightButtonsArea)}>
			{children}
		</div>
	)
}

function ToggleSingleColumnButton() {
	const {webSocketState, setSingleColumn} = useManagedBoard()

	if(webSocketState != WebSocket.OPEN) {
		return null;
	}

	return (
		<button title={"Cambia numero di colonne"} onClick={() => setSingleColumn(prev => !prev)}>
			<FontAwesomeIcon icon={faTableColumns}/>
		</button>
	)
}

function CycleGroupButton() {
	const {webSocketState, nextGrouper} = useManagedBoard()

	if(webSocketState != WebSocket.OPEN) {
		return null;
	}

	return (
		<button title={"Cambia raggruppamento"} onClick={nextGrouper}>
			<FontAwesomeIcon icon={faObjectGroup}/>
		</button>
	)
}

function CycleSortButton() {
	const {webSocketState, nextSorter} = useManagedBoard()

	if(webSocketState != WebSocket.OPEN) {
		return null;
	}

	return (
		<button title={"Cambia ordinamento"} onClick={nextSorter}>
			<FontAwesomeIcon icon={faArrowDownWideShort}/>
		</button>
	)
}
