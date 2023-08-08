import {ReactNode} from "react"
import style from "./AppBody.module.css"


export function AppBody({children}: {children: ReactNode}) {
	return (
		<body className={style.appBody}>
			{children}
		</body>
	)
}
