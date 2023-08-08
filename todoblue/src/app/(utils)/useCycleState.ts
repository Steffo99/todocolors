"use client";
import {useCallback, useMemo, useState} from "react"


/**
 * **Hook** similar to {@link useState}, but which allows a value to be chosen from a cycle of items.
 *
 * @param items The items in the cycle.
 */
export function useCycleState(items: any[]) {
	const [index, setIndex] = useState<number>(0);

	const value = useMemo(() => items[index], [index])

	const move = useCallback((num: number) => {
		setIndex((prevIndex) => (prevIndex + num) % items.length);
	}, [items])

	const next = useCallback(() => move(1), [move]);
	const previous = useCallback(() => move(-1), [move]);

	return {index, value, move, next, previous}
}
