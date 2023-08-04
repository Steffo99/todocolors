'use client';

import {BoardAction} from "@/app/board/[board]/Types"
import {useBoardState} from "@/app/board/[board]/useBoardState"
import {useBoardWebSocketURL} from "@/app/board/[board]/useBoardWebSocketURL"
import {useCallback} from "react"
import {useWebSocket} from "@/app/useWebSocket"


export function useBoardWebSocket(name: string) {
	const {webSocketURL} = useBoardWebSocketURL(name)
	const {state, act} = useBoardState();

	const {websocket, websocketState} = useWebSocket(webSocketURL, {
		onopen: useCallback((_sock: WebSocket, _event: Event) => {
			console.debug("[useBoard] Connected to board:", name);
			act(null);
		}, []),
		onmessage: useCallback((_sock: WebSocket, event: MessageEvent) => {
			const action: BoardAction = JSON.parse(event.data);
			console.debug("[useBoard] Received:", action);
			act(action)
		}, []),
	});

	const send = useCallback((data: BoardAction) => {
		if(!websocket || websocketState !== WebSocket.OPEN) {
			console.warn("[useBoardWebSocket] Webbsocket is not yet ready, cannot send:", data);
			return;
		}
		console.debug("[useBoardWebSocket] Sending:", data);
		websocket.send(JSON.stringify(data));
	}, [websocket, websocketState])

	return {state, send, websocketState}
}
