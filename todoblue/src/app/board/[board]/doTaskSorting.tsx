import {TaskWithId} from "@/app/board/[board]/Types"
import {TaskSortingFunction} from "@/app/board/[board]/useBoardTaskArranger"


/**
 * **Function** comparing {@link Task}s by their text, following the order proposed by {@link string.localeCompare}.
 * @param a The first task to compare.
 * @param b The second task to compare.
 */
function compareTasksByText(a: TaskWithId, b: TaskWithId) {return a.text.localeCompare(b.text)}

export const TASK_SORTERS: TaskSortingFunction[] = [
	compareTasksByText,
];
