'use client';

import {BoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)"
import {BoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)"
import {useBoardState} from "@/app/[lang]/board/[board]/(api)/(state)/useBoardState"
import {useBoardWsURL} from "@/app/[lang]/board/[board]/(api)/(ws)/useBoardWsURL"
import {useCallback, useMemo} from "react"
import {useWs, WebSocketHandlerParams} from "@/app/(api)/useWs"


/**
 * **Hook** connecting to the WebSocket of the specified board (with {@link useBoardWsURL} and {@link useWs}), and then tracking its real-time state (with {@link useBoardState}).
 *
 * @param boardName The name of the board to track.
 */
export function useBoardWs(boardName: string) {
	const wsFullURL = useBoardWsURL(boardName)

	const {boardState, processBoardSignal} = useBoardState();

	const {webSocket, webSocketState, webSocketBackoffMs} = useWs(wsFullURL, {

		onopen: useCallback(({}) => {
			console.debug("[useBoardWs] Opened connection, resetting BoardState to default:", boardName);
			processBoardSignal(null);
		}, [processBoardSignal]),

		onmessage: useCallback(({event}: WebSocketHandlerParams<MessageEvent>) => {
			const action: BoardSignal = JSON.parse(event.data);
			console.debug("[useBoardWs] Received signal:", action);
			processBoardSignal(action)
		}, [processBoardSignal]),

		onerror: useCallback(({event, closeWebSocket}: WebSocketHandlerParams<Event>) => {
			console.error("[useBoardWs] Encountered a WebSocket error, closing current connection:", event);
			closeWebSocket()
		}, []),

		onclose: useCallback(({event}: WebSocketHandlerParams<Event>) => {
			console.debug("[useBoardWs] Closed connection:", event);
		}, [])

	});

	const sendRequest = useCallback((data: BoardRequest) => {
		if(!webSocket || webSocketState !== WebSocket.OPEN) {
			console.warn("[useBoardWs] WebSocket is not yet ready, cannot send:", data);
			return;
		}
		console.debug("[useBoardWs] Sending request:", data);
		webSocket.send(JSON.stringify(data));
	}, [webSocket, webSocketState])

	const isReady = useMemo(() => webSocket !== null && webSocketState === WebSocket.OPEN, [webSocket, webSocketState])

	return {boardName, boardState, sendRequest, webSocketState, webSocketBackoffMs, isReady}
}
