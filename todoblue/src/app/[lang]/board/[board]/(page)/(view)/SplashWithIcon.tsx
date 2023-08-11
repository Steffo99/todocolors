import cn from "classnames"
import {ReactNode} from "react"
import style from "./SplashWithIcon.module.css"


export function SplashWithIcon({text, icon, className}: {text: string, icon: ReactNode, className?: string}) {
	return (
		<div className={cn(style.splashWithIcon, className)}>
			<div>
				{icon}
			</div>
			<div>
				{text}
			</div>
		</div>
	)
}
