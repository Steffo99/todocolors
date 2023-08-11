import {Task, TaskImportance, TaskPriority, TaskStatus} from "@/app/[lang]/board/[board]/(api)/(task)"
import classNames from "classnames"
import importanceStyle from "./taskImportance.module.css"
import priorityStyle from "./taskPriority.module.css"
import statusStyle from "./taskStatus.module.css"


export function taskClassNames(t: Task) {
    return classNames({
        [importanceStyle.taskImportanceHighest]: t.importance === TaskImportance.Highest,
        [importanceStyle.taskImportanceHigh]: t.importance === TaskImportance.High,
        [importanceStyle.taskImportanceNormal]: t.importance === TaskImportance.Normal,
        [importanceStyle.taskImportanceLow]: t.importance === TaskImportance.Low,
        [importanceStyle.taskImportanceLowest]: t.importance === TaskImportance.Lowest,

        [priorityStyle.taskPriorityHighest]: t.priority === TaskPriority.Highest,
        [priorityStyle.taskPriorityHigh]: t.priority === TaskPriority.High,
        [priorityStyle.taskPriorityNormal]: t.priority === TaskPriority.Normal,
        [priorityStyle.taskPriorityLow]: t.priority === TaskPriority.Low,
        [priorityStyle.taskPriorityLowest]: t.priority === TaskPriority.Lowest,

        [statusStyle.taskStatusUnfinished]: t.status === TaskStatus.Unfinished,
        [statusStyle.taskStatusInProgress]: t.status === TaskStatus.InProgress,
        [statusStyle.taskStatusComplete]: t.status === TaskStatus.Complete,
    })
}
