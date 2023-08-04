import {TaskWithId} from "@/app/board/[board]/Types"
import {TaskSortingFunction} from "@/app/board/[board]/useBoardTaskArranger"

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
 * **Function** comparing {@link Task}s by their text, following the order proposed by {@link string.localeCompare}.
 * @param a The first task to compare.
 * @param b The second task to compare.
 */
function compareText(a: TaskWithId, b: TaskWithId) {return a.text.localeCompare(b.text)}

/**
 * **Function** comparing {@link Task}s by their {@link TaskPriority}, sorting highest priorities before the lowest.
 * @param a The first task to compare.
 * @param b The second task to compare.
 */
function comparePriority(a: TaskWithId, b: TaskWithId) {return PRIORITY_TO_NUMBER[b.priority] - PRIORITY_TO_NUMBER[a.priority]}

/**
 * **Function** comparing {@link Task}s by their {@link TaskImportance}, sorting highest priorities before the lowest.
 * @param a The first task to compare.
 * @param b The second task to compare.
 */
function compareImportance(a: TaskWithId, b: TaskWithId) {return IMPORTANCE_TO_NUMBER[b.importance] - IMPORTANCE_TO_NUMBER[a.importance]}

function comparePriorityImportanceText(a: TaskWithId, b: TaskWithId) {
	let diff;
	diff = comparePriority(a, b)
	if(diff != 0) return diff;
	diff = compareImportance(a, b)
	if(diff != 0) return diff
	diff = compareText(a, b)
	return diff
}

function compareImportancePriorityText(a: TaskWithId, b: TaskWithId) {
	let diff;
	diff = compareImportance(a, b)
	if(diff != 0) return diff
	diff = comparePriority(a, b)
	if(diff != 0) return diff;
	diff = compareText(a, b)
	return diff
}

export const TASK_SORTERS: TaskSortingFunction[] = [
	compareText,
	comparePriorityImportanceText,
	compareImportancePriorityText,
];
