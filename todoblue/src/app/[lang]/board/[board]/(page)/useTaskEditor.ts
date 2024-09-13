import {Task} from "@/app/[lang]/board/[board]/(api)/(task)"
import {convertSTT} from "@/app/[lang]/board/[board]/(page)/(edit)/convertSTT"
import {taskToString} from "@/app/[lang]/board/[board]/(page)/(edit)/convertTTS"
import {useCallback, useMemo, useState} from "react"


export function useTaskEditor(lang: string) {
	const [input, setInput] = useState<string>("")
	const task = useMemo(() => convertSTT(input, lang), [input, lang])

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
