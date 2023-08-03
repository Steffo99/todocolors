import {BoardColumn} from "@/app/board/[board]/BoardColumn"
import {useManagedBoard} from "@/app/board/[board]/BoardManager"
import style from "./BoardMainTaskGroups.module.css"


export function BoardMainTaskGroups() {
	const {taskGroups} = useManagedBoard()

	return (
		<main className={style.boardMainTaskGroups}>
			{taskGroups.map((tg) => <BoardColumn taskGroup={tg}/>)}
		</main>
	)
}
