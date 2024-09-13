import {TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)"
import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import cn from "classnames"
import {ComponentPropsWithoutRef} from "react"
import style from "./TaskContainer.module.css"


export type TaskContainerProps = {
    className?: string,
    role: "article" | "form",
    importance: TaskImportance,
	deadline: number | null,
    status: TaskSimplifiedStatus,
} & ComponentPropsWithoutRef<"article">


export function TaskContainer({role, className, importance, deadline, status, ...props}: TaskContainerProps) {
	const now = + new Date();
	const delta = deadline === null ? null : deadline - now
	const deltaAbs = delta === null ? null : Math.abs(delta)
	
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
	        [style.taskDeadlineNone]: deadline === null,
	        [style.taskDeadlineHour]: deltaAbs !== null && deltaAbs < 60 * 60 * 1000,
	        [style.taskDeadlineDay]: deltaAbs !== null && 60 * 60 * 1000 <= deltaAbs && deltaAbs < 24 * 60 * 60 * 1000,
	        [style.taskDeadlineWeek]: deltaAbs !== null && 24 * 60 * 60 * 1000 <= deltaAbs && deltaAbs < 7 * 24 * 60 * 60 * 1000,
	        [style.taskDeadlineMonth]: deltaAbs !== null && deltaAbs >= 7 * 24 * 60 * 60 * 1000,
	        [style.taskDeadlineIncoming]: delta !== null && delta > 0,
	        [style.taskDeadlinePast]: delta !== null && delta < 0,
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
