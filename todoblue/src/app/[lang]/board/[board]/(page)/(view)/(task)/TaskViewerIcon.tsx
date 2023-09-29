import {TaskIcon} from "@/app/[lang]/board/[board]/(api)/(task)"
import {TaskIconComponent} from "@/app/[lang]/board/[board]/(page)/(task)/TaskIconComponent"
import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import {TFunction} from "i18next"


const TASK_STATUS_TO_I18N_KEY: {[key in TaskSimplifiedStatus]: string} = {
    [TaskSimplifiedStatus.NonExistent]: "taskStatusNonExistent",
    [TaskSimplifiedStatus.Unfinished]: "taskStatusUnfinished",
    [TaskSimplifiedStatus.InProgress]: "taskStatusInProgress",
    [TaskSimplifiedStatus.Complete]: "taskStatusComplete",
    [TaskSimplifiedStatus.Journaled]: "taskStatusJournaled",
}

export type TaskViewerIconProps = {
    t: TFunction,
    status: TaskSimplifiedStatus,
    icon: TaskIcon,
    onInteract?: Parameters<typeof TaskIconComponent>[0]["onInteract"]
}

export function TaskViewerIcon({t, status, icon, onInteract}: TaskViewerIconProps) {
    return (
        <TaskIconComponent
            title={t(TASK_STATUS_TO_I18N_KEY[status])}
            status={status}
            icon={icon}
            onInteract={onInteract}
        />
    )
}
