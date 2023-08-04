import {Task} from "@/app/board/[board]/Types"
import {useCallback, useMemo, useState} from "react"


const PRIORITY_RE = /[^][1-5]\b/
const IMPORTANCE_RE = /![1-5]\b/
const ICON_RE = /\[[A-Za-z]+]\b/

const MATCH_TO_IMPORTANCE = {
	"!1": "Lowest",
	"!2": "Low",
	"!3": "Normal",
	"!4": "High",
	"!5": "Highest",
}

const MATCH_TO_PRIORITY = {
	"^1": "Lowest",
	"^2": "Low",
	"^3": "Normal",
	"^4": "High",
	"^5": "Highest",
}

const MATCH_TO_ICON = {
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

export function rawToEvent(raw: string): Task {
	const priorityMatch = raw.match(PRIORITY_RE)
	const importanceMatch = raw.match(IMPORTANCE_RE)
	const iconMatch = raw.match(ICON_RE)

	const priority = MATCH_TO_PRIORITY[priorityMatch?.[0]];
	const importance = MATCH_TO_IMPORTANCE[importanceMatch?.[0]];
	const icon = MATCH_TO_ICON[iconMatch?.[0]?.toLowerCase()]

	// TODO: Splice so the regex aren't executed twice
	raw = raw.replace(PRIORITY_RE, "")
	raw = raw.replace(IMPORTANCE_RE, "")
	raw = raw.replace(ICON_RE, "")

	raw = raw.trim()

	return {
		text: raw,
		status: "Unfinished",
		priority,
		importance,
		icon,
	}
}


export function useBoardTaskEditor() {
	const [raw, setRaw] = useState<string>();

	const task = useMemo(() => rawToEvent(raw), [raw])

	const setTask = useCallback((t: Task) => {
		setRaw("") // TODO
	}, [])
}
