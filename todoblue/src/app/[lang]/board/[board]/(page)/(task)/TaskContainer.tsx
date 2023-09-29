import {TaskImportance, TaskPriority} from "@/app/[lang]/board/[board]/(api)/(task)"
import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import cn from "classnames"
import {ComponentPropsWithoutRef} from "react"
import style from "./TaskContainer.module.css"


export type TaskContainerProps = {
    className?: string,
    role: "article" | "form",
    importance: TaskImportance,
    priority: TaskPriority,
    status: TaskSimplifiedStatus,
} & ComponentPropsWithoutRef<"article">


export function TaskContainer({role, className, importance, priority, status, ...props}: TaskContainerProps) {
    const fullProps = {
        className: cn({
            "panel": true,
            [style.taskContainer]: true,
            [style.taskContainerClickable]: true,
            [style.taskImportanceHighest]: importance === TaskImportance.Highest,
            [style.taskImportanceHigh]: importance === TaskImportance.High,
            [style.taskImportanceNormal]: importance === TaskImportance.Normal,
            [style.taskImportanceLow]: importance === TaskImportance.Low,
            [style.taskImportanceLowest]: importance === TaskImportance.Lowest,
            [style.taskPriorityHighest]: priority === TaskPriority.Highest,
            [style.taskPriorityHigh]: priority === TaskPriority.High,
            [style.taskPriorityNormal]: priority === TaskPriority.Normal,
            [style.taskPriorityLow]: priority === TaskPriority.Low,
            [style.taskPriorityLowest]: priority === TaskPriority.Lowest,
            [style.taskStatusNonExistent]: status === TaskSimplifiedStatus.NonExistent,
            [style.taskStatusUnfinished]: status === TaskSimplifiedStatus.Unfinished,
            [style.taskStatusInProgress]: status === TaskSimplifiedStatus.InProgress,
            [style.taskStatusComplete]: status === TaskSimplifiedStatus.Complete,
            [style.taskStatusJournaled]: status === TaskSimplifiedStatus.Journaled,
        }, className),
        ...props,
    }

    if(role === "article") {
        return (
            <article {...fullProps}/>
        )
    }
    else if(role === "form") {
        return (
            <form {...fullProps}/>
        )
    }
    else {
        return null
    }
}
