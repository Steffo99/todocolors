import {useManagedBoard} from "@/app/board/[board]/BoardManager"
import {FormEvent, useCallback} from "react"


export function BoardTaskEditForm() {
	const {editedTaskText, setEditedTaskText, editedTask, send} = useManagedBoard()

	const submitTask = useCallback((e: FormEvent) => {
		e.preventDefault();
		send({"Task": [null, editedTask]});
		setEditedTaskText("")
	}, [send, editedTask])

	return (
		<form onSubmit={submitTask}>
			<input type={"text"} placeholder={"What to do...?"} value={editedTaskText} onChange={(e) => setEditedTaskText(e.target.value)}/>
		</form>
	)
}
