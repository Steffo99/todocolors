import {Task, TaskIcon, TaskImportance, TaskPriority} from "@/app/board/[board]/Types"
import {useCallback, useMemo, useState} from "react"


const PRIORITY_RE = /\^[1-5]\s?/
const IMPORTANCE_RE = /![1-5]\s?/
const ICON_RE = /\[([A-Za-z]+)]\s?/

const MATCH_TO_IMPORTANCE: {[key: string]: TaskImportance} = {
	"!1": "Lowest",
	"!2": "Low",
	"!3": "Normal",
	"!4": "High",
	"!5": "Highest",
}

const IMPORTANCE_TO_MATCH: {[key in TaskImportance]: string} = {
	"Lowest": "!1",
	"Low": "!2",
	"Normal": "!3",
	"High": "!4",
	"Highest": "!5",
}

const MATCH_TO_PRIORITY: {[key: string]: TaskPriority} = {
	"^1": "Lowest",
	"^2": "Low",
	"^3": "Normal",
	"^4": "High",
	"^5": "Highest",
}

const PRIORITY_TO_MATCH: {[key in TaskPriority]: string} = {
	"Lowest": "^1",
	"Low": "^2",
	"Normal": "^3",
	"High": "^4",
	"Highest": "^5",
}

const MATCH_TO_ICON: {[key: string]: TaskIcon} = {
	"user": "User",
	"image": "Image",
	"envelope": "Envelope",
	"star": "Star",
	"heart": "Heart",
	"comment": "Comment",
	"facesmile": "FaceSmile",
	"file": "File",
	"bell": "Bell",
	"bookmark": "Bookmark",
	"eye": "Eye",
	"hand": "Hand",
	"paperplane": "PaperPlane",
	"handshake": "Handshake",
	"sun": "Sun",
	"clock": "Clock",
	"circle": "Circle",
	"square": "Square",
	"building": "Building",
	"flag": "Flag",
	"moon": "Moon",
}

function rawToTask(raw: string): Task {
	const priorityMatch = PRIORITY_RE.exec(raw)
	const importanceMatch = IMPORTANCE_RE.exec(raw)
	const iconMatch = ICON_RE.exec(raw)

	// @ts-ignore TS2538
	const priority = MATCH_TO_PRIORITY[priorityMatch?.[0]?.trim()] ?? "Normal";
	// @ts-ignore TS2538
	const importance = MATCH_TO_IMPORTANCE[importanceMatch?.[0]?.trim()] ?? "Normal";
	// @ts-ignore TS2538
	const icon = MATCH_TO_ICON[iconMatch?.[1]?.trim()?.toLowerCase()] ?? "Circle";

	// TODO: Splice so the regex aren't executed twice
	raw = raw?.replace(PRIORITY_RE, "")
	raw = raw?.replace(IMPORTANCE_RE, "")
	raw = raw?.replace(ICON_RE, "")

	raw = raw.trim()

	return {
		text: raw,
		status: "Unfinished",
		priority,
		importance,
		icon,
	}
}

function taskToRaw(task: Task): string {
	return `[${task.icon}] ${IMPORTANCE_TO_MATCH[task.importance]} ${PRIORITY_TO_MATCH[task.priority]} ${task.text}`
}

export function useBoardTaskEditor() {
	const [editedTaskText, setEditedTaskText] = useState<string>("");

	const editedTask = useMemo(() => rawToTask(editedTaskText), [editedTaskText])

	const setEditedTask = useCallback((t: Task) => {
		setEditedTaskText(taskToRaw(t))
	}, [])

	return {editedTaskText, setEditedTaskText, editedTask, setEditedTask}
}
