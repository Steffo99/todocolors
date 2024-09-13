import {useCallback, useEffect, useState} from "react"


export type UseTimeDelta = {
	now?: number
	delta?: number,
	deltaAbs?: number,
	refresh: () => void,
}

export function useTimeDelta(target?: number, refreshAfterMs?: number): UseTimeDelta {
	const [now, setNow] = useState<number>(() => + new Date())
	
	const refresh = useCallback(() => {
		setNow(+new Date())
	}, [])
	
	const delta = target === undefined ? undefined : target - now
	
	const deltaAbs = delta === undefined ? undefined : Math.abs(delta)
	
	useEffect(() => {
		if(refreshAfterMs) {
			const timeout = setTimeout(refresh, refreshAfterMs)
			return () => {
				clearTimeout(timeout)
			}
		}
	}, [refresh])
	
	return {now, delta, deltaAbs, refresh}
}
