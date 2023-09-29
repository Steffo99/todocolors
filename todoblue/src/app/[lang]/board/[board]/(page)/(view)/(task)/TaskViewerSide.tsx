import cn from "classnames"
import {ReactNode} from "react"
import style from "./TaskViewerSide.module.css"


export function TaskViewerSide({visible, children}: {visible: boolean, children: ReactNode}) {
    return (
        <div className={cn({
            [style.taskViewerSide]: true,
            [style.taskViewerSideVisible]: visible,
            [style.taskViewerSideHidden]: !visible,
        })}>
            {children}
        </div>
    )
}
