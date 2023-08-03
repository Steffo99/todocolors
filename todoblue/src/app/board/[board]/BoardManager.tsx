import {BoardContext} from "@/app/board/[board]/BoardContext"
import {useBoard} from "@/app/board/[board]/useBoard"
import {ReactNode} from "react"


export function BoardManager({name, children}: {name: string, children: ReactNode}) {
	const context = useBoard(name);

	return (
		<BoardContext.Provider value={context}>
			{children}
		</BoardContext.Provider>
	)
}
