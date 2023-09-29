import cn from "classnames"
import {useMemo} from "react"
import style from "./TaskDebug.module.css"


type TaskDebugProps = {
    className?: string,
    task: object,
}


export function TaskDebug({className, task}: TaskDebugProps) {
    const json = useMemo(() => JSON.stringify(task, undefined, 2), [task])

    return (
        <pre className={cn(style.taskDebug, className)}>
            <code lang={"json"}>
                {json}
            </code>
        </pre>
    )
}
