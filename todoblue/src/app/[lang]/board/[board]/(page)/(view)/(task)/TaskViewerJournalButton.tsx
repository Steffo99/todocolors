import {UpdateTaskBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {TaskButton} from "@/app/[lang]/board/[board]/(page)/(task)/TaskButton"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"
import {fas} from "@awesome.me/kit-dfe340c874/icons"
import {TFunction} from "i18next"
import {SyntheticEvent, useCallback} from "react"


export function TaskViewerJournalButton({t, taskWithId: [id, task]}: {t: TFunction, taskWithId: TaskWithId}) {
    const {sendRequest, boardState: {locked}} = useBoardConsumer()

    const toggleJournalTask = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
        if("key" in e && typeof e["key"] === "string") {
            if(!["Enter", " "].includes(e.key)) {
                return;
            }
        }
        e.preventDefault()
        e.stopPropagation()
        const request: UpdateTaskBoardChange = {"Task": [id, {...task, journaled_on: task.journaled_on ? null : + new Date()}]};
        sendRequest(request)
    }, [task, sendRequest])

    return (
        <TaskButton
            title={t("taskButtonJournal")}
            icon={fas.faBookBookmark}
            onInteract={locked ? undefined : toggleJournalTask}
        />
    )
}
