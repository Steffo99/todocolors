import {TaskIcon, TaskImportance, TaskPriority} from "@/app/[lang]/board/[board]/(api)/(task)"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"
import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)/SortingMode"


const TASK_IMPORTANCE_TO_VALUE = {
	[TaskImportance.Highest]: 1,
	[TaskImportance.High]: 2,
	[TaskImportance.Normal]: 3,
	[TaskImportance.Low]: 4,
	[TaskImportance.Lowest]: 5,
}

const TASK_PRIORITY_TO_VALUE = {
	[TaskPriority.Highest]: 1,
	[TaskPriority.High]: 2,
	[TaskPriority.Normal]: 3,
	[TaskPriority.Low]: 4,
	[TaskPriority.Lowest]: 5,
}

const TASK_ICON_TO_VALUE = {
	[TaskIcon.Bookmark]: 1,
	[TaskIcon.Circle]: 2,
	[TaskIcon.Square]: 3,
	[TaskIcon.Heart]: 4,
	[TaskIcon.Star]: 5,
	[TaskIcon.Sun]: 6,
	[TaskIcon.Moon]: 7,
	[TaskIcon.Eye]: 8,
	[TaskIcon.Hand]: 9,
	[TaskIcon.Handshake]: 10,
	[TaskIcon.FaceSmile]: 11,
	[TaskIcon.User]: 12,
	[TaskIcon.Comment]: 13,
	[TaskIcon.Envelope]: 14,
	[TaskIcon.File]: 15,
	[TaskIcon.PaperPlane]: 16,
	[TaskIcon.Building]: 17,
	[TaskIcon.Flag]: 18,
	[TaskIcon.Bell]: 19,
	[TaskIcon.Clock]: 20,
	[TaskIcon.Image]: 21,
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
        return TASK_ICON_TO_VALUE[a[1].icon] - TASK_ICON_TO_VALUE[b[1].icon]
    },
    [SortingMode.ByImportance]: function sortTasksByImportance(a: TaskWithId, b: TaskWithId) {
        return TASK_IMPORTANCE_TO_VALUE[a[1].importance] - TASK_IMPORTANCE_TO_VALUE[b[1].importance]
    },
    [SortingMode.ByPriority]: function sortTasksByPriority(a: TaskWithId, b: TaskWithId) {
        return TASK_PRIORITY_TO_VALUE[a[1].priority] - TASK_PRIORITY_TO_VALUE[b[1].priority]
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
