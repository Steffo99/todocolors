import {TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)"
import {ICONS} from "@/app/[lang]/board/[board]/(api)/(task)/TaskIcon"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/GroupingMode"
import {TaskGroup} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/TaskGroup"


const TASK_IMPORTANCE_TO_VALUE = {
    [TaskImportance.Highest]: 1,
    [TaskImportance.High]: 2,
    [TaskImportance.Normal]: 3,
    [TaskImportance.Low]: 4,
    [TaskImportance.Lowest]: 5,
}

const TASK_STATUS_TO_VALUE = {
	"Journaled": 3,
	"Complete": 2,
	"InProgress": 1,
	"Unfinished": 0,
}

export const GROUPING_MODE_TO_GROUP_SORTER_FUNCTION = {
    [GroupingMode.ByImportance]: function sortGroupsByImportance(a: TaskGroup<TaskImportance>, b: TaskGroup<TaskImportance>): number {
        return TASK_IMPORTANCE_TO_VALUE[a.k] - TASK_IMPORTANCE_TO_VALUE[b.k]
    },
    [GroupingMode.ByStatus]: function sortGroupsByStatus(a: TaskGroup<string>, b: TaskGroup<string>): number {
        // @ts-ignore
		return TASK_STATUS_TO_VALUE[a.k] - TASK_STATUS_TO_VALUE[b.k]
    },
    [GroupingMode.ByIcon]: function sortGroupsByIcon(a: TaskGroup<string>, b: TaskGroup<string>): number {
        return ICONS.indexOf(a.k as any) - ICONS.indexOf(b.k as any)
    },
    [GroupingMode.Journal]: function sortGroupsAlphabetically(a: TaskGroup<string>, b: TaskGroup<string>): number {
        return b.k.localeCompare(a.k)
    }
}
