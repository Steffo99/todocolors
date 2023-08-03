import {TaskIconEl} from "@/app/board/[board]/TaskIconEl"
import {Task, TaskWithId} from "@/app/board/[board]/Types"
import {useBoardContext} from "@/app/board/[board]/useBoardContext"
import {useCallback} from "react"
import style from "./TaskDiv.module.css"
import cn from "classnames"

export function TaskDiv({task}: {task: TaskWithId}) {
	const {send} = useBoardContext()

	const toggleStatus = useCallback(() => {
		if(task.status === "Unfinished") {
			send({"Task": [task.id, {...task, status: "Complete"}]})
		}
		else if(task.status === "Complete") {
			send({"Task": [task.id, {...task, status: "Unfinished"}]})
		}
	}, [send, task])

	return (
		<div onClick={toggleStatus} tabIndex={0} className={cn({
			"panel": true,
			[style.taskDiv]: true,
			[style.taskPriorityHighest]: task.priority === "Highest",
			[style.taskPriorityHigh]: task.priority === "High",
			[style.taskPriorityNormal]: task.priority === "Normal",
			[style.taskPriorityLow]: task.priority === "Low",
			[style.taskPriorityLowest]: task.priority === "Lowest",
			[style.taskImportanceHighest]: task.importance === "Highest",
			[style.taskImportanceHigh]: task.importance === "High",
			[style.taskImportanceNormal]: task.importance === "Normal",
			[style.taskImportanceLow]: task.importance === "Low",
			[style.taskImportanceLowest]: task.importance === "Lowest",
			[style.taskStatusUnfinished]: task.status === "Unfinished",
			[style.taskStatusInProgress]: task.status === "InProgress",
			[style.taskStatusComplete]: task.status === "Complete",
		})}>
			<div className={style.taskIcon}>
				<TaskIconEl icon={task.icon} style={task.status === "Complete" ? "solid" : "regular"}/>
			</div>
			<div className={cn({
				[style.taskDescription]: true,
				[style.taskDescriptionComplete]: task.status === "Complete",
			})}>
				{task.text}
			</div>
		</div>
	)
}
