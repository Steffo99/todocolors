"use client";

import {createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext} from "react"
import useLocalStorage from "use-local-storage"

export interface StarContextData {
	starred: string[],
	setStarred: Dispatch<SetStateAction<string[] | undefined>>
	addStarred: (key: string) => void,
	removeStarred: (key: string) => void,
}

const StarContext = createContext<StarContextData | null>(null)

export function StarredManager({children}: {children: ReactNode}) {
	const [starred, setStarred] = useLocalStorage<string[]>("TODOBLUE_STARRED", [])

	const addStarred = useCallback((value: string) => {
		setStarred(prev => {
			if(!prev) {
				return [value]
			}
			else {
				return [...prev, value]
			}
		})
	}, [])

	const removeStarred = useCallback((value: string) => {
		setStarred(prev => {
			if(!prev) {
				return []
			}
			else {
				const result = [...prev]
				delete result[result.indexOf(value)]
				return result
			}
		})
	}, [])

	return (
		<StarContext.Provider value={{starred, setStarred, addStarred, removeStarred}}>
			{children}
		</StarContext.Provider>
	)
}

export function useManagedStarred(): StarContextData {
	const context = useContext(StarContext)

	if(context === null) {
		throw new Error("useStarContext used outside a StarContext.")
	}

	return context
}
