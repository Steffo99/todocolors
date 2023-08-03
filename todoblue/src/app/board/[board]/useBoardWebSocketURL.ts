import {useMemo} from "react"


export function useBoardWebSocketURL(name: string) {
    const webSocketURL = useMemo(() => `ws://127.0.0.1:8080/board/${name}/ws`, [name]);
    return {webSocketURL}
}
