import {TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/GroupingMode"

export const GROUPING_MODE_TO_TASK_GROUPER_FUNCTION = {
	[GroupingMode.ByImportance]: function groupTasksByImportance(t: TaskWithId): TaskImportance | null {
		if(t[1].journaled_on) return null
		return t[1].importance
	},
	[GroupingMode.ByStatus]: function groupTasksByStatus(t: TaskWithId): string | null {
		if(t[1].journaled_on) return null
		else if(t[1].completed_on) return "Complete"
		else if(t[1].started_on) return "InProgress"
		else return "Unfinished"
	},
	[GroupingMode.ByIcon]: function groupTasksByIcon(t: TaskWithId): string | null {
		if(t[1].journaled_on) return null
		return t[1].icon
	},
	[GroupingMode.Journal]: function groupTasksByCompletitionDate(t: TaskWithId): string | null {
		if(!t[1].journaled_on) return null
		let date;
		if(!t[1].completed_on) date = new Date(0)
		else date = new Date(t[1].completed_on)
		return date.toISOString().split("T")[0]
	}
}
