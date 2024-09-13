import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import {fal, far, fas} from "@awesome.me/kit-dfe340c874/icons"
import {IconPack} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {SyntheticEvent} from "react"
import style from "./TaskIconComponent.module.css"


type TaskIconProps = {
    className?: string,
    title: string,
    icon: string,
    status: TaskSimplifiedStatus,
    onInteract?: (e: SyntheticEvent<HTMLButtonElement>) => void,
}

const STATUS_TO_PREFIX: {[t in TaskSimplifiedStatus]: IconPack} = {
	[TaskSimplifiedStatus.Unfinished]: fal,
	[TaskSimplifiedStatus.InProgress]: far,
	[TaskSimplifiedStatus.Complete]: fas,
	[TaskSimplifiedStatus.Journaled]: fas,
	[TaskSimplifiedStatus.NonExistent]: far,
}

export function TaskIconComponent({className, title, icon, status, onInteract}: TaskIconProps) {
    const clickable = !!onInteract;

    return (
        <button
            className={cn({
                [style.taskIconComponent]: true,
                [style.taskIconComponentClickable]: clickable,
            }, className)}
            type={"button"}
            title={title}
            onClick={onInteract}
            onKeyDown={onInteract}
            tabIndex={clickable ? 0 : -1}
        >
            <FontAwesomeIcon
                size={"lg"}
                icon={STATUS_TO_PREFIX[status][`fa${icon}`]}
                beatFade={status === TaskSimplifiedStatus.InProgress}
            />
        </button>
    )
}
