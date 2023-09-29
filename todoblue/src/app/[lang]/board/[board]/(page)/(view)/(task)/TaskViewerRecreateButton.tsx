import {DeleteTaskBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {taskToString} from "@/app/[lang]/board/[board]/(page)/(edit)/taskToString"
import {TaskButton} from "@/app/[lang]/board/[board]/(page)/(task)/TaskButton"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"
import {faTrashArrowUp} from "@fortawesome/free-solid-svg-icons"
import {TFunction} from "i18next"
import {Dispatch, SetStateAction, SyntheticEvent, useCallback} from "react"


export type TaskViewerRecreateButtonProps = {
    t: TFunction,
    taskWithId: TaskWithId,
    setEditorInput: Dispatch<SetStateAction<string>>,
}


export function TaskViewerRecreateButton({t, taskWithId: [id, task], setEditorInput}: TaskViewerRecreateButtonProps) {
    const {sendRequest, boardState: {locked}} = useBoardConsumer()

    const recreateTask = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
        if("key" in e && typeof e["key"] === "string") {
            if(!["Enter", " "].includes(e.key)) {
                return;
            }
        }
        e.preventDefault()
        e.stopPropagation()
        setEditorInput(taskToString(task))
        const request: DeleteTaskBoardRequest = {"Task": [id, null]};
        sendRequest(request)
    }, [task, setEditorInput, sendRequest])

    return (
        <TaskButton
            title={t("taskButtonRecreate")}
            icon={faTrashArrowUp}
            onInteract={locked ? undefined : recreateTask}
        />
    )
}
