import cn from "classnames"
import {ReactNode} from "react"
import style from "./TaskActions.module.css"


type TaskActionsProps = {
    className?: string,
    children: ReactNode,
}


export function TaskActions({className, children}: TaskActionsProps) {
    return (
        <div className={cn(style.taskActions, className)}>
            {children}
        </div>
    )
}
