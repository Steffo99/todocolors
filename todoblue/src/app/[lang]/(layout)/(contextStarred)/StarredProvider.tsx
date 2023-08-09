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

	const toggleStarred = useCallback((value: string) => {
		setStarred(prev => {
			if(!prev) {
				return [value]
			}
			const result = [...prev]
			const index = result.indexOf(value)
			if(!index) {
				result.push(value)
			}
			else {
				result.splice(index, 1)
			}
			return result
		})
	}, [])

	const isStarred = useCallback((value: string) => {
		return starred.indexOf(value) >= 0
	}, [starred])

	return (
		<StarredContext.Provider value={{starred, setStarred, addStarred, removeStarred, toggleStarred, isStarred}}>
			{children}
		</StarredContext.Provider>
	)
}
