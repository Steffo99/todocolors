import cn from "classnames"
import style from "./TaskDescription.module.css"


type TaskDescriptionProps = {
    className?: string,
    text: string,
}

export function TaskDescription({className, text}: TaskDescriptionProps) {
    return (
        <div className={cn({
            "taskDescription": true,
            [style.taskDescription]: true,
        }, className)} tabIndex={0}>
            {text}
        </div>
    )
}
