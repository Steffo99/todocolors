"use client";

import {StarredContext} from "@/app/[lang]/(layout)/(contextStarred)/StarredContext"
import {ReactNode, useCallback} from "react"
import useLocalStorage from "use-local-storage"


export function StarredProvider({children}: {children: ReactNode}) {
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
				result.splice(result.indexOf(value), 1)
				return result
			}
		})
	}, [])

	return (
		<StarredContext.Provider value={{starred, setStarred, addStarred, removeStarred}}>
			{children}
		</StarredContext.Provider>
	)
}
