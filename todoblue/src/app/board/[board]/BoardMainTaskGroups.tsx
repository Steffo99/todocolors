import {BoardColumn} from "@/app/board/[board]/BoardColumn"
import {useManagedBoard} from "@/app/board/[board]/BoardManager"
import cn from "classnames"
import style from "./BoardMainTaskGroups.module.css"


export function BoardMainTaskGroups({className}: {className?: string}) {
	const {taskGroups} = useManagedBoard()

	return (
		<main className={cn(style.boardMainTaskGroups, className)}>
			{taskGroups.map((tg) => <BoardColumn taskGroup={tg}/>)}
		</main>
	)
}
