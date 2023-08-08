"use client";
import {useCallback} from "react"
import {useRouter} from "next/navigation"

export function useBoardCreator() {
	const router = useRouter();

	const createBoard = useCallback((board: String) => {
		router.push(`/board/${board}`);
	}, [])

	return {createBoard}
}
