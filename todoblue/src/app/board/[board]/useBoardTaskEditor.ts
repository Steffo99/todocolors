import {Task} from "@/app/board/[board]/Types"
import {useState} from "react"


const PRIORITY_RE = /[^][1-5]\b/
const IMPORTANCE_RE = /[!][1-5]\b/
const ICON_RE = /\[[A-Za-z]+]\b/


export function rawToEvent(raw: string): Task {
	return {

	}
}


export function useBoardTaskEditor() {
	const [raw, setRaw] = useState<string>();
}
