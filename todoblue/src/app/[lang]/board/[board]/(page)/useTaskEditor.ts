import {Task} from "@/app/[lang]/board/[board]/(api)/(task)"
import {stringToTask} from "@/app/[lang]/board/[board]/(page)/(edit)/stringToTask"
import {taskToString} from "@/app/[lang]/board/[board]/(page)/(edit)/taskToString"
import {useCallback, useMemo, useState} from "react"


export function useTaskEditor(lang: string) {
	const [input, setInput] = useState<string>("")
	const task = useMemo(() => stringToTask(input, lang), [input, lang])

	const setTask = useCallback((t: Task) => {
		setInput(taskToString(t, lang))
	}, [])

	return {
		input,
		setInput,
		task,
		setTask,
	}
}
