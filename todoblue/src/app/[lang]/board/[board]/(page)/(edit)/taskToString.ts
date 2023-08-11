import {Task, TaskImportance, TaskPriority} from "@/app/[lang]/board/[board]/(api)/(task)"
import {ICON_DEFAULT, ICON_GLYPH} from "@/app/[lang]/board/[board]/(page)/(edit)/icon"
import {IMPORTANCE_DEFAULT, IMPORTANCE_GLYPH} from "@/app/[lang]/board/[board]/(page)/(edit)/importance"
import {PRIORITY_DEFAULT, PRIORITY_GLYPH} from "@/app/[lang]/board/[board]/(page)/(edit)/priority"

const TASK_IMPORTANCE_TO_VALUE = {
	[TaskImportance.Highest]: "1",
	[TaskImportance.High]: "2",
	[TaskImportance.Normal]: "3",
	[TaskImportance.Low]: "4",
	[TaskImportance.Lowest]: "5",
}

const TASK_PRIORITY_TO_VALUE = {
	[TaskPriority.Highest]: "1",
	[TaskPriority.High]: "2",
	[TaskPriority.Normal]: "3",
	[TaskPriority.Low]: "4",
	[TaskPriority.Lowest]: "5",
}

export function taskToString(t: Task): string {
	let s = ""

	if(t.importance !== IMPORTANCE_DEFAULT) {
		s += IMPORTANCE_GLYPH
		s += TASK_IMPORTANCE_TO_VALUE[t.importance]
		s += " "
	}

	if(t.priority !== PRIORITY_DEFAULT) {
		s += PRIORITY_GLYPH
		s += TASK_PRIORITY_TO_VALUE[t.priority]
		s += " "
	}

	if(t.icon !== ICON_DEFAULT) {
		s += ICON_GLYPH
		s += t.icon
		s += " "
	}

	s += t.text

	return s
}
