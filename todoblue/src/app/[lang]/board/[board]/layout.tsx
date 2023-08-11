import {BoardProvider} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)/BoardProvider"
import {ReactNode} from "react"


export default function layout({children, params: {board: boardName}}: { children: ReactNode, params: {board: string} }) {
	return (
		<BoardProvider name={boardName}>
			{children}
		</BoardProvider>
	)
}
