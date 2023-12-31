import {TaskIcon} from "@/app/[lang]/board/[board]/(api)/(task)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {TaskEditorIcon} from "@/app/[lang]/board/[board]/(page)/(edit)/(task)/TaskEditorIcon"
import {TaskEditorInput} from "@/app/[lang]/board/[board]/(page)/(edit)/(task)/TaskEditorInput"
import {taskToString} from "@/app/[lang]/board/[board]/(page)/(edit)/taskToString"
import {TaskContainer} from "@/app/[lang]/board/[board]/(page)/(task)/TaskContainer"
import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import {useTaskEditor} from "@/app/[lang]/board/[board]/(page)/useTaskEditor"
import cn from "classnames"
import {TFunction} from "i18next"
import {SyntheticEvent, useCallback} from "react"
import style from "./TaskEditor.module.css"


const ICON_SEQUENCE = [
	TaskIcon.Bookmark,
	TaskIcon.Circle,
	TaskIcon.Square,
	TaskIcon.Heart,
	TaskIcon.Star,
	TaskIcon.Sun,
	TaskIcon.Moon,
	TaskIcon.Eye,
	TaskIcon.Hand,
	TaskIcon.Handshake,
	TaskIcon.FaceSmile,
	TaskIcon.User,
	TaskIcon.Comment,
	TaskIcon.Envelope,
	TaskIcon.File,
	TaskIcon.PaperPlane,
	TaskIcon.Building,
	TaskIcon.Flag,
	TaskIcon.Bell,
	TaskIcon.Clock,
	TaskIcon.Image,
]


export function TaskEditor({t, className, editorHook: {input, setInput, task, setTask}}: {t: TFunction, className?: string, editorHook: ReturnType<typeof useTaskEditor>}) {
	const {isReady, sendRequest} = useBoardConsumer()

	const nextIcon = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
		if("key" in e && typeof e["key"] === "string") {
			if(![" "].includes(e.key)) {
				return;
			}
		}
		e.preventDefault()
		e.stopPropagation()
		let index = ICON_SEQUENCE.indexOf(task.icon) + 1;
		if(index === ICON_SEQUENCE.length) index = 0;
		setTask({...task, icon: ICON_SEQUENCE[index]})
	}, [task])

	const submitTask = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
		e.preventDefault()
		e.stopPropagation()
		if(task.text === "") return
		sendRequest({"Task": [null, task]})
		setInput(taskToString({...task, text: ""}))
	}, [sendRequest, task, setInput])

	if(!isReady) return null

	return (
		<div
			className={cn(className, style.taskEditorContainer)}
		>
			<TaskContainer
				role={"form"}
				importance={task.importance}
				priority={task.priority}
				status={TaskSimplifiedStatus.NonExistent}
				onSubmit={submitTask}
			>
				<TaskEditorIcon
					t={t}
					icon={task.icon}
					nextIcon={nextIcon}
				/>
				<TaskEditorInput
					t={t}
					input={input}
					setInput={setInput}
				/>
			</TaskContainer>
		</div>
	)
}
