import {TaskDiv} from "@/app/board/[board]/TaskDiv"
import {TaskGroup} from "@/app/board/[board]/useBoardTaskArranger"
import style from "./TaskGroupColumn.module.css"


export function BoardColumn({taskGroup}: {taskGroup: TaskGroup}) {
	return (
		<div className={style.boardColumn}>
			<h3>
				{taskGroup.name}
			</h3>
			{taskGroup.tasks.map(task => <TaskDiv task={task}/>)}
		</div>
	)
}
