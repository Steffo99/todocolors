import {useClientTranslation} from "@/app/(i18n)/client"
import {DeleteTaskBoardRequest, ModifyTaskBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)"
import {TASK_ICON_TO_FONTAWESOME_REGULAR, TASK_ICON_TO_FONTAWESOME_SOLID, TaskStatus} from "@/app/[lang]/board/[board]/(api)/(task)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {taskToString} from "@/app/[lang]/board/[board]/(page)/(edit)/taskToString"
import {taskClassNames} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/taskClassNames"
import style from "@/app/[lang]/board/[board]/(page)/(view)/TaskViewer.module.css"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskWithId"
import {faTrashArrowUp} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {Dispatch, MouseEvent, SetStateAction, useCallback, useState} from "react"


export function TaskViewer({lang, task, setEditorInput}: {lang: string, task: TaskWithId, setEditorInput: Dispatch<SetStateAction<string>>}) {
    const [isFlipped, setFlipped] = useState<boolean>(false)

	return (
		<div
			className={cn({
				"panel": true,
				[style.taskViewer]: true,
				[style.taskViewerFront]: !isFlipped,
				[style.taskViewerBack]: isFlipped,
			}, taskClassNames(task[1]))}
			onClick={() => setFlipped(prev => !prev)}
		>
			{isFlipped ? <TaskViewerBack lang={lang} task={task} setEditorInput={setEditorInput}/> : <TaskViewerFront lang={lang} task={task}/>}
		</div>
	)
}

function TaskViewerFront({lang, task}: {lang: string, task: TaskWithId}) {
	const {sendRequest} = useBoardConsumer()

	const toggleStatus = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		let request: ModifyTaskBoardRequest
		switch(task[1].status) {
			case TaskStatus.Unfinished:
				request = {"Task": [task[0], {...task[1], status: TaskStatus.InProgress}]}
				break
			case TaskStatus.InProgress:
				request = {"Task": [task[0], {...task[1], status: TaskStatus.Complete}]}
				break
			case TaskStatus.Complete:
				request = {"Task": [task[0], {...task[1], status: TaskStatus.Unfinished}]}
				break
		}
		sendRequest(request)
	}, [task, sendRequest])

    return <>
		<div className={style.taskIcon} onClick={toggleStatus} tabIndex={0}>
			<FontAwesomeIcon
				size={"lg"}
				icon={task[1].status === TaskStatus.Complete ? TASK_ICON_TO_FONTAWESOME_SOLID[task[1].icon] : TASK_ICON_TO_FONTAWESOME_REGULAR[task[1].icon]}
				beatFade={task[1].status === TaskStatus.InProgress}
			/>
		</div>
		<span className={style.taskDescription} tabIndex={0}>
			{task[1].text}
		</span>
	</>
}

function TaskViewerBack({lang, task, setEditorInput}: {lang: string, task: TaskWithId, setEditorInput: Dispatch<SetStateAction<string>>}) {
	const {t} = useClientTranslation(lang, "board")
	const {sendRequest} = useBoardConsumer()

	const recreateTask = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setEditorInput(taskToString(task[1]))
		const request: DeleteTaskBoardRequest = {"Task": [task[0], null]};
		sendRequest(request)
	}, [task, setEditorInput, sendRequest])

	return <>
		<div className={style.taskButtons}>
			<button title={t("taskButtonRecreate")} onClick={recreateTask}>
				<FontAwesomeIcon size={"sm"} icon={faTrashArrowUp}/>
			</button>
		</div>
	</>
}
