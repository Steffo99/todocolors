import {ReactNode} from "react"
import style from "./Body.module.css"


export function Body({children}: {children: ReactNode}) {
	return (
		<body className={style.appBody}>
			{children}
		</body>
	)
}
