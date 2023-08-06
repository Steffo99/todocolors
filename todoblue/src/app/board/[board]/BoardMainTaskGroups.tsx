import {useManagedBoard} from "@/app/board/[board]/BoardManager"
import {TaskDisplay} from "@/app/board/[board]/TaskDisplay"
import {TaskGroup} from "@/app/board/[board]/useBoardTaskArranger"
import cn from "classnames"
import style from "./BoardMainTaskGroups.module.css"


export function BoardMainTaskGroups({className}: {className?: string}) {
	const {taskGroups, isSingleColumn} = useManagedBoard()

	return (
		<main className={cn(className, {
			[style.boardMainTaskGroups]: true,
			[style.boardMainTaskGroupsMultiColumn]: !isSingleColumn,
			[style.boardMainTaskGroupsSingleColumn]: isSingleColumn,
		})}>
			{taskGroups.map((tg) => <BoardColumn taskGroup={tg} key={tg.key}/>)}
		</main>
	)
}

function BoardColumn({taskGroup}: {taskGroup: TaskGroup}) {
	return (
		<div className={style.boardColumn}>
			<h3>
				{taskGroup.name}
			</h3>
			<div className={style.boardColumnContents}>
				{taskGroup.tasks.map(task => <TaskDisplay task={task} key={task.id}/>)}
			</div>
		</div>
	)
}
