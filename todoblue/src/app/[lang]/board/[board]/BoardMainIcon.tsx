import cn from "classnames"
import {ReactNode} from "react"
import style from "./BoardMainIcon.module.css"


export function BoardMainIcon({text, icon, className}: {text: string, icon: ReactNode, className?: string}) {
	return (
		<main className={cn(style.boardLoading, className)}>
			<div>
				{icon}
			</div>
			<div>
				{text}
			</div>
		</main>
	)
}
