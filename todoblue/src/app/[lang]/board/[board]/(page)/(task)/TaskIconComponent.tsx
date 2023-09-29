import {TASK_ICON_TO_FONTAWESOME_REGULAR, TASK_ICON_TO_FONTAWESOME_SOLID, TaskIcon} from "@/app/[lang]/board/[board]/(api)/(task)"
import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {SyntheticEvent} from "react"
import style from "./TaskIconComponent.module.css"


type TaskIconProps = {
    className?: string,
    title: string,
    icon: TaskIcon,
    status: TaskSimplifiedStatus,
    onInteract?: (e: SyntheticEvent<HTMLButtonElement>) => void,
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
                icon={[TaskSimplifiedStatus.Complete, TaskSimplifiedStatus.Journaled].includes(status) ? TASK_ICON_TO_FONTAWESOME_SOLID[icon] : TASK_ICON_TO_FONTAWESOME_REGULAR[icon]}
                beatFade={status === TaskSimplifiedStatus.InProgress}
            />
        </button>
    )
}
