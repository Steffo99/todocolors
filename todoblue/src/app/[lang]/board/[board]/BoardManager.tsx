import {useBoard, UseBoardReturns} from "@/app/[lang]/board/[board]/useBoard"
import {createContext, ReactNode, useContext} from "react"


/**
 * **Context** where {@link UseBoardReturns} are stored in.
 */
const BoardContext = createContext<UseBoardReturns | null>(null);

/**
 * **Component** handling everything displayed in a board's page and allowing children to access it via {@link useManagedBoard}.
 *
 * @param name The name of the board to connect to.
 * @param children The nodes to which provide access to {@link useManagedBoard}.
 * @constructor
 */
export function BoardManager({name, children}: {name: string, children: ReactNode}) {
	const context = useBoard(name);

	return (
		<BoardContext.Provider value={context}>
			{children}
		</BoardContext.Provider>
	)
}

/**
 * **Hook** allowing components to access values managed by {@link useBoard}.
 */
export function useManagedBoard(): UseBoardReturns {
	const context = useContext(BoardContext);

	if(context === null) {
		console.error("[useBoardManager] Was used outside of a BoardContext!")
		throw Error()
	}

	return context
}
