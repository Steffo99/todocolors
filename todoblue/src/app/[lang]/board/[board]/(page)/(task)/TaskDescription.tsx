import cn from "classnames"
import style from "./TaskDescription.module.css"


type TaskDescriptionProps = {
    className?: string,
	isSource?: boolean,
    text: string,
}

export function TaskDescription({className, isSource, text}: TaskDescriptionProps) {
    return (
        <div className={cn({
            "taskDescription": true,
            [style.taskDescription]: true,
	        [style.taskDescriptionSource]: isSource,
        }, className)} tabIndex={0}>
            {text}
        </div>
    )
}
