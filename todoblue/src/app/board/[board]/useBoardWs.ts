'use client';

import {BoardAction} from "@/app/board/[board]/Types"
import {useBoardState} from "@/app/board/[board]/useBoardState"
import {useWsBaseURL} from "@/app/useWsBaseURL"
import {useCallback, useMemo} from "react"
import {useWs, WebSocketHandlerParams} from "@/app/useWs"


export function useBoardWs(name: string) {
	const wsBaseURL = useWsBaseURL()
	const wsFullURL = useMemo(() => wsBaseURL ? `${wsBaseURL}/board/${name}/ws` : undefined, [wsBaseURL, name])

	const {state, act} = useBoardState();

	const {webSocket, webSocketState} = useWs(wsFullURL, {
		onopen: useCallback(({}) => {
			console.debug("[useBoardWs] Connected to board:", name);
			act(null);
		}, [act]),
		onmessage: useCallback(({event}: WebSocketHandlerParams<MessageEvent>) => {
			const action: BoardAction = JSON.parse(event.data);
			console.debug("[useBoardWs] Parsed payload as:", action);
			act(action)
		}, [act]),
		onerror: useCallback(({event, closeWebSocket}: WebSocketHandlerParams<Event>) => {
			console.error("[useBoardWs] Encountered a WebSocket error, closing current connection:", event);
			closeWebSocket()
		}, []),
		onclose: useCallback(({event, openWebSocket}: WebSocketHandlerParams<Event>) => {
			console.debug("[useBoardWs] WebSocket was closed, trying to reconnect:", event);
			openWebSocket()
		}, [])
	});

	const sendAction = useCallback((data: BoardAction) => {
		if(!webSocket || webSocketState !== WebSocket.OPEN) {
			console.warn("[useBoardWs] WebSocket is not yet ready, cannot send:", data);
			return;
		}
		console.debug("[useBoardWs] Sending:", data);
		webSocket.send(JSON.stringify(data));
	}, [webSocket, webSocketState])

	return {state, sendAction, webSocketState}
}
