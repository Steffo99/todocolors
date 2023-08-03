import {BoardContext} from "@/app/board/[board]/BoardContext"
import {UseBoardReturns} from "@/app/board/[board]/useBoard"
import {useContext} from "react"


export function useBoardContext(): UseBoardReturns {
	const context = useContext(BoardContext);

	if(context === null) {
		throw Error()
	}

	return context
}
