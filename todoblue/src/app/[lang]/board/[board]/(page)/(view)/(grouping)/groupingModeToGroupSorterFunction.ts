import {TaskIcon, TaskImportance, TaskPriority} from "@/app/[lang]/board/[board]/(api)/(task)"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/GroupingMode"
import {TaskGroup} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/TaskGroup"


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

const TASK_STATUS_TO_VALUE = {
	"Journaled": 3,
	"Complete": 2,
	"InProgress": 1,
	"Unfinished": 0,
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

export const GROUPING_MODE_TO_GROUP_SORTER_FUNCTION = {
    [GroupingMode.ByImportance]: function sortGroupsByImportance(a: TaskGroup<TaskImportance>, b: TaskGroup<TaskImportance>): number {
        return TASK_IMPORTANCE_TO_VALUE[a.k] - TASK_IMPORTANCE_TO_VALUE[b.k]
    },
    [GroupingMode.ByPriority]: function sortGroupsByPriority(a: TaskGroup<TaskPriority>, b: TaskGroup<TaskPriority>): number {
        return TASK_PRIORITY_TO_VALUE[a.k] - TASK_PRIORITY_TO_VALUE[b.k]
    },
    [GroupingMode.ByStatus]: function sortGroupsByStatus(a: TaskGroup<string>, b: TaskGroup<string>): number {
        // @ts-ignore
		return TASK_STATUS_TO_VALUE[a.k] - TASK_STATUS_TO_VALUE[b.k]
    },
    [GroupingMode.ByIcon]: function sortGroupsByIcon(a: TaskGroup<TaskIcon>, b: TaskGroup<TaskIcon>): number {
        return TASK_ICON_TO_VALUE[a.k] - TASK_ICON_TO_VALUE[b.k]
    },
    [GroupingMode.Journal]: function sortGroupsAlphabetically(a: TaskGroup<TaskIcon>, b: TaskGroup<TaskIcon>): number {
        return b.k.localeCompare(a.k)
    }
}
