import {TaskGroupColumn} from "@/app/board/[board]/TaskGroupColumn"
import {useBoardContext} from "@/app/board/[board]/useBoardContext"
import style from "./BoardMainTaskGroups.module.css"


export function BoardMainTaskGroups() {
	const {taskGroups} = useBoardContext()

	return (
		<main className={style.boardMainTaskGroups}>
			{taskGroups.map((tg) => <TaskGroupColumn taskGroup={tg}/>)}
		</main>
	)
}
