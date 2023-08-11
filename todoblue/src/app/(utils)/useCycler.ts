"use client";
import {ReturnTypeOfUseState} from "@/app/(utils)/ReturnTypeOfUseState"
import {useCallback, useMemo, useState} from "react"


/**
 * **Hook** which alters a hook with the same interface as {@link useState}, to allow a value to be chosen from a cycle of items.
 *
 * @param stateHook The hook to alter.
 * @param items The items in the cycle.
 */
export function useCycler<T>(stateHook: ReturnTypeOfUseState<number | undefined>, items: T[]) {
	const [index, setIndex] = stateHook;

	const value = useMemo(() => {
		let actualIndex = index;
		if(actualIndex === undefined) {
			actualIndex = 0;
		}
		return items[actualIndex]
	}, [index])

	const move = useCallback((num: number) => {
		setIndex((prevIndex) => {
			let actualIndex = prevIndex;
			if(actualIndex === undefined) {
				actualIndex = 0;
			}
			return (actualIndex + num) % items.length
		});
	}, [items])

	const next = useCallback(() => move(1), [move]);
	const previous = useCallback(() => move(-1), [move]);

	return {index, value, move, next, previous}
}
