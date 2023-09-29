import {IconDefinition} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {SyntheticEvent} from "react"
import style from "./TaskButton.module.css"


type TaskButtonProps = {
    className?: string,
    title: string,
    icon: IconDefinition,
    onInteract?: (e: SyntheticEvent<HTMLButtonElement>) => void,
}


export function TaskButton({className, title, icon, onInteract}: TaskButtonProps) {
    return (
        <button
            className={cn({
                "fade": !onInteract,
                [style.taskButton]: true,
            }, className)}
            title={title}
            disabled={!onInteract}
            onPointerDown={onInteract}
            onKeyDown={onInteract}
            tabIndex={0}
        >
            <FontAwesomeIcon
                size={"sm"}
                icon={icon}
            />
        </button>
    )
}
