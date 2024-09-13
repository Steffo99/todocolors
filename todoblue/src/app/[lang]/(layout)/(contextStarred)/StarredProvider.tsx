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
			if(prev.indexOf(value) >= 0) {
				return prev
			}
			return [...prev, value]
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
			if(index <= -1) {
				result.push(value)
			}
			else {
				result.splice(index, 1)
			}
			return result
		})
	}, [])

	const isStarred = useCallback((value: string) => {
		return starred.includes(value)
	}, [starred])

	return (
		<StarredContext.Provider value={{starred, setStarred, addStarred, removeStarred, toggleStarred, isStarred}}>
			{children}
		</StarredContext.Provider>
	)
}
