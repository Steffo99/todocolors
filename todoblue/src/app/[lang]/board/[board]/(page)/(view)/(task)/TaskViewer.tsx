import {ModifyTaskBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {taskToString} from "@/app/[lang]/board/[board]/(page)/(edit)/convertTTS"
import {TaskActions} from "@/app/[lang]/board/[board]/(page)/(task)/TaskActions"
import {TaskContainer} from "@/app/[lang]/board/[board]/(page)/(task)/TaskContainer"
import {TaskDescription} from "@/app/[lang]/board/[board]/(page)/(task)/TaskDescription"
import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"
import {TaskViewerIcon} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskViewerIcon"
import {TaskViewerJournalButton} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskViewerJournalButton"
import {TaskViewerRecreateButton} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskViewerRecreateButton"
import {TFunction} from "i18next"
import {Dispatch, KeyboardEvent, PointerEvent, SetStateAction, SyntheticEvent, useCallback, useState} from "react"


export function TaskViewer({lang, t, taskWithId: [id, task], setEditorInput}: {lang: string, t: TFunction, taskWithId: TaskWithId, setEditorInput: Dispatch<SetStateAction<string>>}) {
    const [isFlipped, setFlipped] = useState<boolean>(false)
	const {sendRequest, boardState: {locked}} = useBoardConsumer()

	const toggleFlipOnKeyDown = useCallback(
		(e: KeyboardEvent<HTMLDivElement>) => {
			if("key" in e && typeof e["key"] === "string") {
				if(!["Enter", " "].includes(e.key)) {
					return;
				}
			}
			e.preventDefault()
			e.stopPropagation()
			setFlipped(prev => !prev)
		},
		[]
	)

	const flipOnPointerEnter = useCallback(
		(e: PointerEvent<HTMLDivElement>) => {
			if(!["mouse", "pen"].includes(e.pointerType)) {
				return
			}
			e.preventDefault()
			e.stopPropagation()
			setFlipped(true)
		},
		[]
	)

    const flopOnPointerLeave = useCallback(
        (e: PointerEvent<HTMLDivElement>) => {
            if(!["mouse", "pen"].includes(e.pointerType)) {
                return
            }
            e.preventDefault()
            e.stopPropagation()
            setFlipped(false)
        },
        []
    )

	const toggleFlipOnTouch = useCallback(
        (e: PointerEvent<HTMLDivElement>) => {
            if(!["", "touch"].includes(e.pointerType)) {
                return
            }
            e.preventDefault()
            e.stopPropagation()
            setFlipped(prev => !prev)
		},
		[]
	)

	const toggleStatus = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
		if("key" in e && typeof e["key"] === "string") {
			if(![" "].includes(e.key)) {
				return;
			}
		}
		e.preventDefault()
		e.stopPropagation()
		let request: ModifyTaskBoardRequest

		if(!task.started_on) {
			request = {"Task": [id, {...task, started_on: + new Date()}]}
		}
		else if(!task.completed_on) {
			request = {"Task": [id, {...task, completed_on: + new Date()}]}
		}
		else {
			request = {"Task": [id, {...task, started_on: null, completed_on: null}]}
		}
		sendRequest(request)
	}, [id, task, locked, sendRequest])

	let status = TaskSimplifiedStatus.Unfinished
	if(task.started_on) status = TaskSimplifiedStatus.InProgress
	if(task.completed_on) status = TaskSimplifiedStatus.Complete
	if(task.journaled_on) status = TaskSimplifiedStatus.Journaled

	let sideElements;
	if(!isFlipped) {
		sideElements = null;
	}
	else {
		let goAwayButton
		if(status < TaskSimplifiedStatus.Complete) {
			goAwayButton = (
				<TaskViewerRecreateButton
					t={t}
					lang={lang}
					taskWithId={[id, task]}
					setEditorInput={setEditorInput}
				/>
			)
		}
		else {
			goAwayButton = (
				<TaskViewerJournalButton
					t={t}
					taskWithId={[id, task]}
				/>
			)
		}

		sideElements = (
			<TaskActions>
				{goAwayButton}
			</TaskActions>
		)
	}

	// noinspection PointlessBooleanExpressionJS
	return (
		<TaskContainer
			role={"article"}
			importance={task.importance}
			deadline={task.deadline}
			status={status}
			onKeyDown={toggleFlipOnKeyDown}
			onPointerEnter={flipOnPointerEnter}
			onPointerLeave={flopOnPointerLeave}
			onPointerDown={toggleFlipOnTouch}
		>
			<TaskViewerIcon
				t={t}
			 	icon={task.icon as any}
				status={status}
				onInteract={status === TaskSimplifiedStatus.Journaled ? undefined : toggleStatus}
			/>
			<TaskDescription
				isSource={isFlipped}
				text={isFlipped ? taskToString(task, lang) : task.text}
			/>
			{sideElements}
		</TaskContainer>
	)
}
