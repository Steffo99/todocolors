import {Task, TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)"
import {DEADLINE_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/deadline"
import {ICON_DEFAULT, ICON_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/icon"
import {IMPORTANCE_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/importance"
import {default as dateParser} from "any-date-parser"

// ahhh i love typescript shenanigans
// @ts-ignore
const DATE_FROM_STRING = dateParser.fromString;

const VALUE_TO_TASK_IMPORTANCE = {
	"1": TaskImportance.Highest,
	"2": TaskImportance.High,
	"3": TaskImportance.Normal,
	"4": TaskImportance.Low,
	"5": TaskImportance.Lowest,
}

export function stringToTask(text: string, lang: string): Task {
	const importanceMatch = IMPORTANCE_GLYPH_RE.exec(text)
	const iconMatch = ICON_GLYPH_RE.exec(text)
	const deadlineMatch = DEADLINE_GLYPH_RE.exec(text)

	const importance: TaskImportance = VALUE_TO_TASK_IMPORTANCE[importanceMatch?.[1]?.trim() as "1"|"2"|"3"|"4"|"5" ?? "3"]
	const icon: string = iconMatch?.[1]?.trim() ?? ICON_DEFAULT
	const deadlineGroup: string | undefined = deadlineMatch?.[1]?.trim()
	const deadlineDate: Date | undefined = deadlineGroup === undefined ? undefined : DATE_FROM_STRING(deadlineGroup, lang) ?? undefined
	const deadline: number | null = (deadlineDate?.getTime?.()) ?? null

	// TODO: Splice so the regexes aren't executed twice
	text = text.replace(IMPORTANCE_GLYPH_RE, "")
	text = text.replace(ICON_GLYPH_RE, "")
	text = text.replace(DEADLINE_GLYPH_RE, "")
	text = text.trim()

	return {
		text,
		importance,
		icon,
		deadline,
		created_on: + new Date(),
		started_on: null,
		completed_on: null,
		journaled_on: null,
	}
}
