"use client";

import {TASK_GROUPERS} from "@/app/[lang]/board/[board]/doTaskGrouping"
import {TASK_SORTERS} from "@/app/[lang]/board/[board]/doTaskSorting"
import {BoardAction, Task} from "@/app/[lang]/board/[board]/Types"
import {useBoardTaskEditor} from "@/app/[lang]/board/[board]/useBoardTaskEditor"
import {useBoardWs} from "@/app/[lang]/board/[board]/useBoardWs"
import {TaskGroup, useBoardTaskArranger} from "@/app/[lang]/board/[board]/useBoardTaskArranger"
import {useBoardTitleEditor} from "@/app/[lang]/board/[board]/useBoardTitleEditor"
import {useCycleState} from "@/app/[lang]/useCycleState"
import {Dispatch, SetStateAction, useState} from "react"

export interface UseBoardReturns {
	name: string,
	title: string,
	tasksById: {[id: string]: Task},
	taskGroups: TaskGroup[],
	webSocketState: number | undefined,
	webSocketBackoffMs: number,
	isEditingTitle: boolean,
	stopEditingTitle: () => void,
	startEditingTitle: () => void,
	toggleEditingTitle: () => void,
	moveGrouper: (n: number) => void,
	nextGrouper: () => void,
	previousGrouper: () => void,
	moveSorter: (n: number) => void,
	nextSorter: () => void,
	previousSorter: () => void,
	editTitle: string,
	setEditTitle: Dispatch<SetStateAction<string>>,
	send: (action: BoardAction) => void,
	editedTaskText: string,
	setEditedTaskText: (text: string) => void,
	editedTask: Task,
	setEditedTask: (task: Task) => void,
	isSingleColumn: boolean,
	setSingleColumn: Dispatch<SetStateAction<boolean>>,
}

export function useBoard(name: string): UseBoardReturns {
    const {state: {title, tasksById}, sendAction, webSocketState, webSocketBackoffMs} = useBoardWs(name);

	const {value: [taskGrouper, groupSorter, groupNamer], move: moveGrouper, next: nextGrouper, previous: previousGrouper} = useCycleState(TASK_GROUPERS);
	const {value: taskSorter, move: moveSorter, next: nextSorter, previous: previousSorter} = useCycleState(TASK_SORTERS);

    const {taskGroups} = useBoardTaskArranger(tasksById, taskGrouper, groupSorter, groupNamer, taskSorter);
	const {isEditingTitle, stopEditingTitle, startEditingTitle, toggleEditingTitle, editTitle, setEditTitle} = useBoardTitleEditor(title, sendAction);

	const {editedTaskText, setEditedTaskText, editedTask, setEditedTask} = useBoardTaskEditor()

	const [isSingleColumn, setSingleColumn] = useState<boolean>(false)

    return {
		name,
		title,
		tasksById,
		taskGroups,
		webSocketState,
		webSocketBackoffMs,
		isEditingTitle,
		stopEditingTitle,
		startEditingTitle,
		toggleEditingTitle,
		moveGrouper,
		nextGrouper,
		previousGrouper,
		moveSorter,
		nextSorter,
		previousSorter,
		editTitle,
		setEditTitle,
		send: sendAction,
		editedTaskText,
		setEditedTaskText,
		editedTask,
		setEditedTask,
		isSingleColumn,
		setSingleColumn,
	}
}
