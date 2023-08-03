import {useCallback, useMemo, useState} from "react"


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
