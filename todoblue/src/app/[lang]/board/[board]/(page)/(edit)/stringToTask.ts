import {Task, TaskIcon, TaskImportance, TaskPriority, TaskStatus} from "@/app/[lang]/board/[board]/(api)/(task)"
import {ICON_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/icon"
import {IMPORTANCE_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/importance"
import {PRIORITY_GLYPH_RE} from "@/app/[lang]/board/[board]/(page)/(edit)/priority"

const VALUE_TO_TASK_IMPORTANCE = {
	"1": TaskImportance.Highest,
	"2": TaskImportance.High,
	"3": TaskImportance.Normal,
	"4": TaskImportance.Low,
	"5": TaskImportance.Lowest,
}

const VALUE_TO_TASK_PRIORITY = {
	"1": TaskPriority.Highest,
	"2": TaskPriority.High,
	"3": TaskPriority.Normal,
	"4": TaskPriority.Low,
	"5": TaskPriority.Lowest,
}

const VALUE_TO_TASK_ICON = {
	"bookmark": TaskIcon.Bookmark,
	"circle": TaskIcon.Circle,
	"square": TaskIcon.Square,
	"heart": TaskIcon.Heart,
	"star": TaskIcon.Star,
	"sun": TaskIcon.Sun,
	"moon": TaskIcon.Moon,
	"eye": TaskIcon.Eye,
	"hand": TaskIcon.Hand,
	"handshake": TaskIcon.Handshake,
	"facesmile": TaskIcon.FaceSmile,
	"user": TaskIcon.User,
	"comment": TaskIcon.Comment,
	"envelope": TaskIcon.Envelope,
	"file": TaskIcon.File,
	"paperplane": TaskIcon.PaperPlane,
	"building": TaskIcon.Building,
	"flag": TaskIcon.Flag,
	"bell": TaskIcon.Bell,
	"clock": TaskIcon.Clock,
	"image": TaskIcon.Image,
}

export function stringToTask(text: string): Task {
	const priorityMatch = PRIORITY_GLYPH_RE.exec(text)
	const importanceMatch = IMPORTANCE_GLYPH_RE.exec(text)
	const iconMatch = ICON_GLYPH_RE.exec(text)

	const priority: TaskPriority = VALUE_TO_TASK_PRIORITY[priorityMatch?.[1]?.trim() as "1"|"2"|"3"|"4"|"5" ?? "3"]
	const importance: TaskImportance = VALUE_TO_TASK_IMPORTANCE[importanceMatch?.[1]?.trim() as "1"|"2"|"3"|"4"|"5" ?? "3"]
	// @ts-ignore
	const icon: TaskIcon = VALUE_TO_TASK_ICON[iconMatch?.[1]?.toLowerCase()?.trim()] ?? TaskIcon.Circle

	// TODO: Splice so the regexes aren't executed twice
	text = text.replace(PRIORITY_GLYPH_RE, "")
	text = text.replace(IMPORTANCE_GLYPH_RE, "")
	text = text.replace(ICON_GLYPH_RE, "")
	text = text.trim()

	return {
		text,
		status: TaskStatus.Unfinished,
		priority,
		importance,
		icon,
	}
}
