import {Task, TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)"
import {DEADLINE_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/taskDeadline"
import {ICON_DEFAULT, ICON_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/taskIcon"
import {IMPORTANCE_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/taskImportance"
import {default as dateParser} from "any-date-parser"

type Attempt = {
	year?: number,
	month?: number,
	day?: number,
	hour?: number,
	minute?: number,
	second?: number,
	millisecond?: number,
}

const VALUE_TO_TASK_IMPORTANCE = {
	"1": TaskImportance.Highest,
	"2": TaskImportance.High,
	"3": TaskImportance.Normal,
	"4": TaskImportance.Low,
	"5": TaskImportance.Lowest,
}

export function convertSTT(text: string, lang: string): Task {
	const importanceMatch = IMPORTANCE_GLYPH_RE.exec(text)
	const iconMatch = ICON_GLYPH_RE.exec(text)
	const deadlineMatch = DEADLINE_GLYPH_RE.exec(text)

	const importance: TaskImportance = VALUE_TO_TASK_IMPORTANCE[importanceMatch?.[1]?.trim() as "1"|"2"|"3"|"4"|"5" ?? "3"]
	const icon: string = iconMatch?.[1]?.trim() ?? ICON_DEFAULT
	
	const now = new Date()
	const deadlineGroup: string | undefined = deadlineMatch?.[1]?.trim()
	const deadlineAttempt: Attempt | undefined = deadlineGroup === undefined ? undefined : dateParser.attempt(deadlineGroup, lang) ?? undefined
	const deadlineDate: Date | undefined = deadlineAttempt === undefined ? undefined : new Date(
		deadlineAttempt.year ?? now.getFullYear(),
		(deadlineAttempt.month ?? (now.getMonth() + 1)) - 1,
		deadlineAttempt.day ?? now.getDate(),
		deadlineAttempt.hour ?? now.getHours(),
		deadlineAttempt.minute ?? now.getMinutes(),
		deadlineAttempt.second ?? now.getSeconds(),
		deadlineAttempt.millisecond ?? now.getMilliseconds(),
	)
	const deadline: number | null = (deadlineDate?.getTime?.()) ?? null
	
	console.debug("[convertSTT]", "\ngroup:", deadlineGroup, "\ndate:", deadlineDate, "\ntimestamp:", deadline)

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
