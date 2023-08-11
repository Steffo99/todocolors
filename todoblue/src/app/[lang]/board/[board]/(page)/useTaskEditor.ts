import {stringToTask} from "@/app/[lang]/board/[board]/(page)/(edit)/stringToTask"
import {useMemo, useState} from "react"


export function useTaskEditor() {
	const [input, setInput] = useState<string>("")
	const task = useMemo(() => stringToTask(input), [input])

	return {
		input,
		setInput,
		task,
	}
}
