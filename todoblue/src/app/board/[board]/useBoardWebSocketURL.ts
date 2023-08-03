import {useMemo} from "react"


export function useBoardWebSocketURL(name: string) {
    const webSocketURL = useMemo(() => `${process.env.NEXT_PUBLIC_API_BASE_URL}/board/${name}/ws`, [name]);
    return {webSocketURL}
}
