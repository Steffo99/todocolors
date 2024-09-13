import {TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)"
import {ICONS} from "@/app/[lang]/board/[board]/(api)/(task)/TaskIcon"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"
import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)/SortingMode"


const TASK_IMPORTANCE_TO_VALUE = {
	[TaskImportance.Highest]: 1,
	[TaskImportance.High]: 2,
	[TaskImportance.Normal]: 3,
	[TaskImportance.Low]: 4,
	[TaskImportance.Lowest]: 5,
}


export function getTaskSorter(sortingModes: SortingMode[]) {
    return (a: TaskWithId, b: TaskWithId) => {
        for(const sortingMode of sortingModes) {
            const result = SORTING_MODE_TO_SORTING_FUNCTION[sortingMode](a, b)
            if(result !== 0) {
                return result
            }
        }
        return 0
    }
}

const SORTING_MODE_TO_SORTING_FUNCTION = {
    [SortingMode.ByText]: function sortTasksByText(a: TaskWithId, b: TaskWithId) {
        return a[1].text.localeCompare(b[1].text)
    },
    [SortingMode.ByIcon]: function sortTasksByIcon(a: TaskWithId, b: TaskWithId) {
        return ICONS.indexOf(a[1].icon as any) - ICONS.indexOf(b[1].icon as any)
    },
    [SortingMode.ByImportance]: function sortTasksByImportance(a: TaskWithId, b: TaskWithId) {
        return TASK_IMPORTANCE_TO_VALUE[a[1].importance] - TASK_IMPORTANCE_TO_VALUE[b[1].importance]
    },
    [SortingMode.ByDeadline]: function sortTasksByPriority(a: TaskWithId, b: TaskWithId) {
        return (a[1].deadline ?? -1) - (b[1].deadline ?? -1)
    },
    [SortingMode.ByStatus]: function sortTasksByStatus(a: TaskWithId, b: TaskWithId) {
        if(a[1].journaled_on && !b[1].journaled_on) return 1;
        if(!a[1].journaled_on && b[1].journaled_on) return -1;
        if(a[1].completed_on && !b[1].completed_on) return 1;
        if(!a[1].completed_on && b[1].completed_on) return -1;
        if(a[1].started_on && !b[1].started_on) return -1;
        if(!a[1].started_on && b[1].started_on) return 1;

        // @ts-ignore
        const journaled_on = a[1].journaled_on - b[1].journaled_on
        if(journaled_on) return journaled_on
        // @ts-ignore
        const completed_on = a[1].completed_on - b[1].completed_on
        if(completed_on) return completed_on
        // @ts-ignore
		const started_on = a[1].started_on - b[1].started_on
		if(started_on) return started_on

		return 0
    },
	[SortingMode.ByCreation]: function sortTasksByCreation(a: TaskWithId, b: TaskWithId) {
        // @ts-ignore
        return a[1].created_on - b[1].created_on
	},
}
