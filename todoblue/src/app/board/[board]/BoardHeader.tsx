import {useRouter} from "next/navigation"
import {ReactNode, useCallback} from "react"
import style from "./BoardHeader.module.css"
import {useManagedBoard} from "@/app/board/[board]/BoardManager"
import {faArrowDownWideShort, faHouse, faPencil, faTableColumns} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"


export function BoardHeader() {
	const {isEditingTitle} = useManagedBoard();

	return (
		<header className={style.boardHeader}>
			<TitleArea>
				{isEditingTitle ? <TitleInput/> : <TitleDisplay/>}
			</TitleArea>
			<LeftButtonsArea>
				<HomeButton/>
				<EditTitleButton/>
			</LeftButtonsArea>
			<RightButtonsArea>
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
	const {editTitle, setEditTitle} = useManagedBoard()

	return (
		<input
			className={style.titleInput}
			type={"text"}
			placeholder={"Titolo"}
			onChange={(e) => setEditTitle(e.target.value)}
			value={editTitle}
		/>
	)
}

function TitleDisplay() {
	const {title} = useManagedBoard()

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

function EditTitleButton() {
	const {websocketState, toggleEditingTitle} = useManagedBoard()

	if(websocketState != WebSocket.OPEN) {
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

function CycleGroupButton() {
	const {websocketState, nextGrouper} = useManagedBoard()

	if(websocketState != WebSocket.OPEN) {
		return null;
	}

	return (
		<button title={"Cambia raggruppamento"} onClick={nextGrouper}>
			<FontAwesomeIcon icon={faTableColumns}/>
		</button>
	)
}

function CycleSortButton() {
	const {websocketState, nextSorter} = useManagedBoard()

	if(websocketState != WebSocket.OPEN) {
		return null;
	}

	return (
		<button title={"Cambia ordinamento"} onClick={nextSorter}>
			<FontAwesomeIcon icon={faArrowDownWideShort}/>
		</button>
	)
}
