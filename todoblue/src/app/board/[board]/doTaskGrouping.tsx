import {TaskIconEl} from "@/app/board/[board]/TaskIconEl"
import {TaskIcon, TaskImportance, TaskPriority, TaskStatus, TaskWithId} from "@/app/board/[board]/Types"
import {TaskGroupTitleComponent, TaskGroupComparer, TaskGroup, TaskCategorizer} from "@/app/board/[board]/useBoardTaskArranger"
import {ReactNode} from "react"


/**
 * **Function** categorizing a {@link TaskWithId} based on its {@link TaskIcon}.
 * @param a The task to categorize.
 */
function categorizeTaskByIcon(a: TaskWithId): string {return a.icon}

/**
 * **Function** categorizing a {@link TaskWithId} based on its {@link TaskImportance}.
 * @param a The task to categorize.
 */
function categorizeTaskByImportance(a: TaskWithId): string {return a.importance}

/**
 * **Function** categorizing a {@link TaskWithId} based on its {@link TaskPriority}.
 * @param a The task to categorize.
 */
function categorizeTaskByPriority(a: TaskWithId): string {return a.priority}

/**
 * **Function** categorizing a {@link TaskWithId} based on its {@link TaskStatus}.
 * @param a The task to categorize.
 */
function categorizeTaskByStatus(a: TaskWithId): string {return a.status}

/**
 * **Function** comparing {@link TaskGroup}s by their key.
 * @param a The first task group to compare.
 * @param b The second task group to compare.
 */
function compareGroupsByKey(a: TaskGroup, b: TaskGroup): number {return a.key.localeCompare(b.key)}

/**
 * **Mapping** from {@link TaskImportance} to a {@link number}.
 */
const IMPORTANCE_TO_NUMBER = {
	"Highest": 5,
	"High": 4,
	"Normal": 3,
	"Low": 2,
	"Lowest": 1,
}

/**
 * **Mapping** from {@link TaskImportance} to a {@link string} to be displayed as the title of a column.
 */
const IMPORTANCE_TO_STRING = {
	"Highest": "Critico",
	"High": "Importante",
	"Normal": "Normale",
	"Low": "Opzionale",
	"Lowest": "Irrilevante"
}

/**
 * **Function** comparing {@link TaskGroup}s by their {@link TaskImportance}, with the greatest importance being placed at the start.
 * @param a The first task group to compare.
 * @param b The second task group to compare.
 */
function compareGroupsByDescendingImportance(a: TaskGroup, b: TaskGroup): number {
	const aN = IMPORTANCE_TO_NUMBER[a.key as TaskImportance]
	const bN = IMPORTANCE_TO_NUMBER[b.key as TaskImportance]
	return bN - aN;
}

/**
 * **Mapping** from {@link TaskPriority} to a {@link number}.
 */
const PRIORITY_TO_NUMBER = {
	"Highest": 5,
	"High": 4,
	"Normal": 3,
	"Low": 2,
	"Lowest": 1,
}

/**
 * **Mapping** from {@link TaskPriority} to a {@link string} to be displayed as the title of a column.
 */
const PRIORITY_TO_STRING = {
	"Highest": "Urgente",
	"High": "Prioritario",
	"Normal": "Normale",
	"Low": "Rimandabile",
	"Lowest": "In qualsiasi momento"
}

/**
 * **Function** comparing {@link TaskGroup}s by their {@link TaskPriority}, with the greatest priority being placed at the start.
 * @param a The first task group to compare.
 * @param b The second task group to compare.
 */
function compareGroupsByDescendingPriority(a: TaskGroup, b: TaskGroup): number {
	const aN = PRIORITY_TO_NUMBER[a.key as TaskPriority]
	const bN = PRIORITY_TO_NUMBER[b.key as TaskPriority]
	return bN - aN;
}

/**
 * **Mapping** from {@link TaskStatus} to a {@link number}.
 */
const STATUS_TO_NUMBER = {
	"Unfinished": 1,
	"InProgress": 2,
	"Complete": 3,
}

/**
 * **Mapping** from {@link TaskStatus} to a {@link string} to be displayed as the title of a column.
 */
const STATUS_TO_STRING = {
	"Unfinished": "Da fare",
	"InProgress": "In corso",
	"Complete": "Completati",
}

/**
 * **Function** comparing {@link TaskGroup}s by their {@link TaskStatus}, with the lowest progress being placed at the start.
 * @param a The first task group to compare.
 * @param b The second task group to compare.
 */
function compareGroupsByAscendingStatus(a: TaskGroup, b: TaskGroup): number {
	const aN = STATUS_TO_NUMBER[a.key as TaskStatus]
	const bN = STATUS_TO_NUMBER[b.key as TaskStatus]
	return aN - bN;
}

/**
 * **Component** interpreting the key of a {@link TaskGroup} as a {@link TaskIcon} and rendering it followed by its name.
 * @param key The key to interpret.
 * @constructor
 * @todo Check accessibility status.
 */
function TaskGroupTitleFromIcon({key}: {key: string}): ReactNode {
	let icon = key as TaskIcon;
	return <>
		<TaskIconEl icon={icon} status={"Complete"} size={"lg"}/>
		&nbsp;
		{key}
	</>
}

/**
 * **Component** interpreting the key of a {@link TaskGroup} as {@link TaskImportance} and rendering its name according to {@link IMPORTANCE_TO_STRING}.
 * @param key The key to interpret.
 * @constructor
 */
function TaskGroupTitleFromImportance({key}: {key: string}): ReactNode {
	return IMPORTANCE_TO_STRING[key as TaskImportance];
}

/**
 * **Component** interpreting the key of a {@link TaskGroup} as {@link TaskPriority} and rendering its name according to {@link PRIORITY_TO_STRING}.
 * @param key The key to interpret.
 * @constructor
 */
function TaskGroupTitleFromPriority({key}: {key: string}): ReactNode {
	return PRIORITY_TO_STRING[key as TaskPriority];
}

/**
 * **Component** interpreting the key of a {@link TaskGroup} as {@link TaskStatus} and rendering its name according to {@link STATUS_TO_STRING}.
 * @param key The key to interpret.
 * @constructor
 */
function TaskGroupTitleFromStatus({key}: {key: string}): ReactNode {
	return STATUS_TO_STRING[key as TaskStatus];
}

export const TASK_GROUPERS: [TaskCategorizer, TaskGroupComparer, TaskGroupTitleComponent][] = [
	[categorizeTaskByImportance, compareGroupsByDescendingImportance, TaskGroupTitleFromImportance],
	[categorizeTaskByPriority, compareGroupsByDescendingPriority, TaskGroupTitleFromPriority],
	[categorizeTaskByIcon, compareGroupsByKey, TaskGroupTitleFromIcon],
	[categorizeTaskByStatus, compareGroupsByAscendingStatus, TaskGroupTitleFromStatus],
]
