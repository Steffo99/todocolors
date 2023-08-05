"use client";
import {useMemo} from "react"


const HTTP_TO_WS = {
	"http:": "ws:",
	"https:": "wss:",
}

export function useBoardWebSocketURL(name: string) {
	// @ts-ignore
	const protocol = HTTP_TO_WS[window.location.protocol]
	const host = window.location.host
	
    const webSocketURL = useMemo(() => `${protocol}//${host}/api/board/${name}/ws`, [name]);
    return {webSocketURL}
}
