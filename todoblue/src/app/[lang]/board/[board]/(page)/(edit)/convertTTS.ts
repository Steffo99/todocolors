import {Task, TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)"
import {DEADLINE_DEFAULT, DEADLINE_GLYPH_END, DEADLINE_GLYPH_START} from "@/app/[lang]/board/[board]/(page)/(edit)/taskDeadline"
import {ICON_DEFAULT, ICON_GLYPH} from "@/app/[lang]/board/[board]/(page)/(edit)/taskIcon"
import {IMPORTANCE_DEFAULT, IMPORTANCE_GLYPH} from "@/app/[lang]/board/[board]/(page)/(edit)/taskImportance"


const TASK_IMPORTANCE_TO_VALUE = {
	[TaskImportance.Highest]: "1",
	[TaskImportance.High]: "2",
	[TaskImportance.Normal]: "3",
	[TaskImportance.Low]: "4",
	[TaskImportance.Lowest]: "5",
}

export function taskToString(t: Task, lang: string): string {
	const intlDate = Intl.DateTimeFormat(lang, {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	})
	
	let s = ""
	
	if(t.deadline !== DEADLINE_DEFAULT) {
		s += DEADLINE_GLYPH_START
		s += intlDate.format(new Date(t.deadline))
		s += DEADLINE_GLYPH_END
		s += " "
	}

	if(t.icon !== ICON_DEFAULT) {
		s += ICON_GLYPH
		s += t.icon
		s += " "
	}

	if(t.importance !== IMPORTANCE_DEFAULT) {
		s += IMPORTANCE_GLYPH
		s += TASK_IMPORTANCE_TO_VALUE[t.importance]
		s += " "
	}

	s += t.text

	return s
}
