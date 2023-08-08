'use client';

import {BoardAction} from "@/app/[lang]/board/[board]/Types"
import {useBoardState} from "@/app/[lang]/board/[board]/useBoardState"
import {useWsBaseURL} from "@/app/(api)/useWsBaseURL"
import {useCallback, useMemo} from "react"
import {useWs, WebSocketHandlerParams} from "@/app/(api)/useWs"


export function useBoardWs(name: string) {
	const wsBaseURL = useWsBaseURL()
	const wsFullURL = useMemo(() => wsBaseURL ? `${wsBaseURL}/board/${name}/ws` : undefined, [wsBaseURL, name])

	const {state, act} = useBoardState();

	const {webSocket, webSocketState, webSocketBackoffMs} = useWs(wsFullURL, {
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
		onclose: useCallback(({event}: WebSocketHandlerParams<Event>) => {
			console.debug("[useBoardWs] WebSocket was closed:", event);
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

	return {state, sendAction, webSocketState, webSocketBackoffMs}
}
