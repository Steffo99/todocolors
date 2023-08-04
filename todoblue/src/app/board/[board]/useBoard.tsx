"use client";

import {TASK_GROUPERS} from "@/app/board/[board]/doTaskGrouping"
import {TASK_SORTERS} from "@/app/board/[board]/doTaskSorting"
import {BoardAction, Task} from "@/app/board/[board]/Types"
import {useBoardTaskEditor} from "@/app/board/[board]/useBoardTaskEditor"
import {useBoardWebSocket} from "@/app/board/[board]/useBoardWebSocket"
import {TaskGroup, useBoardTaskArranger} from "@/app/board/[board]/useBoardTaskArranger"
import {useBoardTitleEditor} from "@/app/board/[board]/useBoardTitleEditor"
import {useCycleState} from "@/app/useCycleState"
import {Dispatch, SetStateAction} from "react"

export interface UseBoardReturns {
	title: string,
	tasksById: {[id: string]: Task},
	taskGroups: TaskGroup[],
	websocketState: number,
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
}

export function useBoard(name: string): UseBoardReturns {
    const {state: {title, tasksById}, send, websocketState} = useBoardWebSocket(name);

	const {value: [taskGrouper, groupSorter, groupNamer], move: moveGrouper, next: nextGrouper, previous: previousGrouper} = useCycleState(TASK_GROUPERS);
	const {value: taskSorter, move: moveSorter, next: nextSorter, previous: previousSorter} = useCycleState(TASK_SORTERS);

    const {taskGroups} = useBoardTaskArranger(tasksById, taskGrouper, groupSorter, groupNamer, taskSorter);
	const {isEditingTitle, stopEditingTitle, startEditingTitle, toggleEditingTitle, editTitle, setEditTitle} = useBoardTitleEditor(title, send);

	const {editedTaskText, setEditedTaskText, editedTask, setEditedTask} = useBoardTaskEditor()

    return {
		title,
		tasksById,
		taskGroups,
		websocketState,
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
		send,
		editedTaskText,
		setEditedTaskText,
		editedTask,
		setEditedTask,
	}
}
