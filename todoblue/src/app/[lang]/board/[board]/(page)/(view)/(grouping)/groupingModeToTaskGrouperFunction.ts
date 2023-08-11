import {TaskIcon, TaskImportance, TaskPriority, TaskStatus} from "@/app/[lang]/board/[board]/(api)/(task)"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/GroupingMode"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskWithId"


export const GROUPING_MODE_TO_TASK_GROUPER_FUNCTION = {
	[GroupingMode.ByImportance]: function groupTasksByImportance(t: TaskWithId): TaskImportance {
		return t[1].importance
	},
	[GroupingMode.ByPriority]: function groupTasksByPriority(t: TaskWithId): TaskPriority {
		return t[1].priority
	},
	[GroupingMode.ByStatus]: function groupTasksByStatus(t: TaskWithId): TaskStatus {
		return t[1].status
	},
	[GroupingMode.ByIcon]: function groupTasksByIcon(t: TaskWithId): TaskIcon {
		return t[1].icon
	},
}
