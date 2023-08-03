"use client";

import {TaskIconEl} from "@/app/board/[board]/TaskIconEl"
import {BoardAction} from "@/app/board/[board]/Types"
import {TaskIcon, TaskWithId} from "@/app/board/[board]/types"
import {useBoardWebSocket} from "@/app/board/[board]/useBoardWebSocket"
import {GroupNamingFunction, GroupSortingFunction, TaskGroup, TaskGroupingFunction, TaskSortingFunction, useBoardTaskArranger} from "@/app/board/[board]/useBoardTaskArranger"
import {useBoardTitleEditor} from "@/app/board/[board]/useBoardTitleEditor"
import {useCycleState} from "@/app/useCycleState"
import {faBell, faBookmark, faBuilding, faCircle, faClock, faComment, faEnvelope, faEye, faFaceSmile, faFile, faFlag, faHand, faHandshake, faHeart, faImage, faMoon, faPaperPlane, faSquare, faStar, faSun, faUser, IconDefinition} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Dispatch, SetStateAction} from "react"

function groupTasksByIcon(a: TaskWithId) {return a.icon}
function sortGroupsByKey(a: TaskGroup, b: TaskGroup) {return a.key.localeCompare(b.key)}

function nameToFontAwesomeIcon(a: string) {
	let icon = a as TaskIcon;
	return <>
		<TaskIconEl icon={icon} style={"solid"}/>
		&nbsp;
		{a}
	</>
}

const TASK_GROUPERS: [TaskGroupingFunction, GroupSortingFunction, GroupNamingFunction][] = [
	[groupTasksByIcon, sortGroupsByKey, nameToFontAwesomeIcon],
]

function sortTasksByText(a: TaskWithId, b: TaskWithId) {return a.text.localeCompare(b.text)}

const TASK_SORTERS: TaskSortingFunction[] = [
	sortTasksByText,
];

export interface UseBoardReturns {
	title: string,
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
}

export function useBoard(name: string): UseBoardReturns {
    const {state: {title, tasksById}, send, websocketState} = useBoardWebSocket(name);

	const {value: [taskGrouper, groupSorter, groupNamer], move: moveGrouper, next: nextGrouper, previous: previousGrouper} = useCycleState(TASK_GROUPERS);
	const {value: taskSorter, move: moveSorter, next: nextSorter, previous: previousSorter} = useCycleState(TASK_SORTERS);

    const {taskGroups} = useBoardTaskArranger(tasksById, taskGrouper, groupSorter, groupNamer, taskSorter);
	const {isEditingTitle, stopEditingTitle, startEditingTitle, toggleEditingTitle, editTitle, setEditTitle} = useBoardTitleEditor(title, send);

    return {
		title,
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
	}
}
