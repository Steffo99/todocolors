import {TaskIconComponent} from "@/app/[lang]/board/[board]/(page)/(task)/TaskIconComponent"
import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import {TFunction} from "i18next"
import {SyntheticEvent} from "react"


export function TaskEditorIcon({t, icon, nextIcon}: {t: TFunction, icon: string, nextIcon: (e: SyntheticEvent<HTMLButtonElement>) => void}) {
    return (
        <TaskIconComponent
            title={icon}
            icon={icon}
            status={TaskSimplifiedStatus.NonExistent}
            onInteract={nextIcon}
        />
    )
}
