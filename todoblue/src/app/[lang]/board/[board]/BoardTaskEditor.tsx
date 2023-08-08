import {useManagedBoard} from "@/app/[lang]/board/[board]/BoardManager"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {FormEvent, useCallback} from "react"
import style from "./BoardTaskEditor.module.css"
import {faAdd} from "@fortawesome/free-solid-svg-icons"


export function BoardTaskEditor({className}: {className?: string}) {
	const {editedTask, send, setEditedTaskText, webSocketState} = useManagedBoard()

	const submitTask = useCallback((e: FormEvent) => {
		e.preventDefault();
		send({"Task": [null, editedTask]});
		setEditedTaskText("")
	}, [send, editedTask])

	if(webSocketState != WebSocket.OPEN) {
		return null
	}

	return (
		<form onSubmit={submitTask} className={cn(style.editorForm, className)}>
			<EditorTextInput/>
			<EditorSubmitButton/>
		</form>
	)
}

function EditorTextInput() {
	const {editedTaskText, setEditedTaskText} = useManagedBoard();

	return (
		<input
			type={"text"}
			placeholder={"What to do...?"}
			value={editedTaskText}
			onChange={(e) => setEditedTaskText(e.target.value)}
			className={style.editorTextInput}
		/>
	)
}

function EditorSubmitButton() {
	return (
		<button className={style.editorSubmitButton} title={"Crea"}>
			<FontAwesomeIcon icon={faAdd}/>
		</button>
	)
}
