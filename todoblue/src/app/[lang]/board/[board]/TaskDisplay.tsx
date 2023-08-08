"use client";

import {TaskIconEl} from "@/app/[lang]/board/[board]/TaskIconEl"
import {TaskWithId} from "@/app/[lang]/board/[board]/Types"
import {useManagedBoard} from "@/app/[lang]/board/[board]/BoardManager"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useCallback, useState, MouseEvent} from "react"
import {faTrashCanArrowUp} from "@fortawesome/free-solid-svg-icons"
import style from "./TaskDisplay.module.css"
import cn from "classnames"


export function TaskDisplay({task}: {task: TaskWithId}) {
	const {send} = useManagedBoard()
	const [isDisplayingActions, setDisplayingActions] = useState<boolean>(false)

	const toggleStatus = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if(task.status === "Unfinished") {
			send({"Task": [task.id, {...task, status: "InProgress"}]})
		}
		if(task.status === "InProgress") {
			send({"Task": [task.id, {...task, status: "Complete"}]})
		}
		else if(task.status === "Complete") {
			send({"Task": [task.id, {...task, status: "Unfinished"}]})
		}
	}, [send, task])

	let contents;
	if(isDisplayingActions) {
		contents = <>
			<small className={style.taskId}>
				<code>
					{task.id}
				</code>
			</small>
			<div className={style.taskButtons}>
				<RecreateButton task={task}/>
			</div>
		</>
	}
	else {
		contents = <>
			<div className={style.taskIcon} onClick={toggleStatus} tabIndex={0}>
				<TaskIconEl size={"lg"} icon={task.icon} status={task.status}/>
			</div>
			<div className={cn({
				[style.taskDescription]: true,
				[style.taskDescriptionComplete]: task.status === "Complete",
			})} tabIndex={0}>
				{task.text}
			</div>
		</>
	}

	const conditionalToggleDisplayingActions = useCallback(() => {
		if(window.getSelection()?.isCollapsed === false) {
			return
		}
		setDisplayingActions(prev => !prev)
	}, [])

	return (
		<div
			className={cn({
				"panel": true,
				[style.taskDiv]: true,
				[style.taskDivFront]: !isDisplayingActions,
				[style.taskDivBack]: isDisplayingActions,
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
			})}
			onClick={conditionalToggleDisplayingActions}
		>
			{contents}
		</div>
	)
}

function RecreateButton({task}: {task: TaskWithId}) {
	const {setEditedTask, send} = useManagedBoard()

	const id = task.id;

	const recreateTask = useCallback(() => {
		setEditedTask(task)
		send({"Task": [id, null]})
	}, [send, id])

	return (
		<button onClick={recreateTask}>
			<FontAwesomeIcon icon={faTrashCanArrowUp}/>&nbsp;Ricrea
		</button>
	)
}
