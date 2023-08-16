'use client';

import {useState, useCallback, useEffect} from "react"

export interface WebSocketHandlerParams<E extends Event> {
	event: E,
	openWebSocketAfterBackoff: () => void,
	closeWebSocket: () => void,
}

export interface WebSocketHandlers {
	onclose?: (params: WebSocketHandlerParams<CloseEvent>) => void,
	onerror?: (params: WebSocketHandlerParams<Event>) => void,
	onmessage?: (params: WebSocketHandlerParams<MessageEvent>) => void,
	onopen?: (params: WebSocketHandlerParams<Event>) => void,
}

export function useWs(url: string | undefined, {onclose, onerror, onmessage, onopen}: WebSocketHandlers) {
	const [webSocket, setWebSocket] = useState<WebSocket | undefined>(undefined)
	const [webSocketState, setWebSocketState] = useState<number | undefined>(undefined);
	const [isBackingOff, setBackingOff] = useState<boolean>(false);
	const [webSocketBackoffMs, setWebSocketBackoffMs] = useState<number>(1);

	const closeWebSocket = useCallback(() => {
		console.debug("[useWebSocket] Closing WebSocket:", webSocket);
		if(webSocket === undefined) {
			console.warn("[useWebSocket] Trying to close WebSocket, but no WebSocket is open; ignoring request...")
			return;
		}
		try {
			webSocket.close();
		}
		catch(closeErr) {
			console.debug("[useWebSocket] Failed to close the websocket (it might be already closed):", closeErr)
		}
		setWebSocket(undefined);
		setWebSocketState(WebSocket.CLOSED);
	}, [webSocket])

	const backOff = useCallback((func: () => void) => async () => {
		// This WILL cause no-ops, but they're going to be pretty infrequent, so idc
		console.debug("[useWebSocket] Backing off for:", webSocketBackoffMs, "ms")
		setBackingOff(true)
		await new Promise(resolve => setTimeout(resolve, webSocketBackoffMs))
		setBackingOff(false)
		func()
	}, [webSocketBackoffMs])

	const openWebSocket = useCallback(() => {
		console.debug("[useWebSocket] Opening WebSocket:", url);
		if(url === undefined) {
			console.warn("[useWebSocket] Trying to open WebSocket, but no URL has been given; ignoring request...")
			return;
		}
		setWebSocketBackoffMs(prev => prev * 2);  // Workaround for connections that get closed immediately by the server
		setWebSocketState(WebSocket.CONNECTING);  // Workaround for constructor blocking and giving no feedback to the user
		const sock = new WebSocket(url);
		const openWebSocketAfterBackoff = backOff(openWebSocket);
		sock.onopen = (event) => {
			console.debug("[useWebSocket] Opened connection:", event)
			setWebSocket(sock)
			setWebSocketState(sock.readyState)
			onopen?.({event, openWebSocketAfterBackoff, closeWebSocket});
		}
		sock.onclose = (event) => {
			console.debug("[useWebSocket] Closed connection:", event)
			setWebSocket(undefined)
			setWebSocketState(sock.readyState);
			onclose?.({event, openWebSocketAfterBackoff, closeWebSocket});
		}
		sock.onerror = (event) => {
			console.error("[useWebSocket] Error in connection:", event)
			setWebSocketState(sock.readyState)
			onerror?.({event, openWebSocketAfterBackoff, closeWebSocket});
		}
		sock.onmessage = (event) => {
			console.debug("[useWebSocket] Received message:", event)
			onmessage?.({event, openWebSocketAfterBackoff, closeWebSocket});
		}
	}, [url, onopen, onclose, onerror, onmessage, backOff, closeWebSocket])

	useEffect(() => {
		if(!url) return;
		if(webSocket !== undefined) return;
		if(isBackingOff) return;
		console.debug("[useWebSocket] Hook mounted, opening connection as soon as possible...")
		const openWebSocketAfterBackoff = backOff(openWebSocket);
		// noinspection JSIgnoredPromiseFromCall
		openWebSocketAfterBackoff()
	}, [url, webSocket, isBackingOff, webSocketState])

	return {webSocket, webSocketState, webSocketBackoffMs}
}
