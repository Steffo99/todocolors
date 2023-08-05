import {TaskDisplay} from "@/app/board/[board]/TaskDisplay"
import {TaskGroup} from "@/app/board/[board]/useBoardTaskArranger"
import style from "./BoardColumn.module.css"


export function BoardColumn({taskGroup}: {taskGroup: TaskGroup}) {
	return (
		<div className={style.boardColumn}>
			<h3>
				{taskGroup.name}
			</h3>
			<div>
				{taskGroup.tasks.map(task => <TaskDisplay task={task} key={task.id}/>)}
			</div>
		</div>
	)
}
