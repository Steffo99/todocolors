import {TaskGroupColumn} from "@/app/board/[board]/TaskGroupColumn"
import {useManagedBoard} from "@/app/board/[board]/BoardManager"
import style from "./BoardMainTaskGroups.module.css"


export function BoardMainTaskGroups() {
	const {taskGroups} = useManagedBoard()

	return (
		<main className={style.boardMainTaskGroups}>
			{taskGroups.map((tg) => <TaskGroupColumn taskGroup={tg}/>)}
		</main>
	)
}
