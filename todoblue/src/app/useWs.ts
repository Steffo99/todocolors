'use client';

import {useState, useCallback, useEffect} from "react"

export interface WebSocketHandlerParams<E extends Event> {
	event: E,
	openWebSocket: () => void,
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

	const openWebSocket = useCallback(() => {
		console.debug("[useWebSocket] Opening WebSocket:", url);
		if(url === undefined) {
			console.warn("[useWebSocket] Trying to open WebSocket, but no URL has been given; ignoring request...")
			return;
		}
		setWebSocketState(WebSocket.CONNECTING);  // Workaround for constructor blocking and giving no feedback to the user
		const sock = new WebSocket(url);
		sock.onopen = (event) => {
			console.debug("[useWebSocket] Opened connection:", event)
			setWebSocket(sock)
			setWebSocketState(sock.readyState)
			setWebSocketBackoffMs(1)
			onopen?.({event, openWebSocket, closeWebSocket});
		}
		sock.onclose = (event) => {
			console.debug("[useWebSocket] Closed connection:", event)
			setWebSocket(undefined)
			setWebSocketState(sock.readyState);
			onclose?.({event, openWebSocket, closeWebSocket});
		}
		sock.onerror = (event) => {
			console.error("[useWebSocket] Error in connection:", event)
			setWebSocketState(sock.readyState)
			setWebSocketBackoffMs(prev => prev * 2)
			onerror?.({event, openWebSocket, closeWebSocket});
		}
		sock.onmessage = (event) => {
			console.debug("[useWebSocket] Received message:", event)
			onmessage?.({event, openWebSocket, closeWebSocket});
		}
	}, [url, onopen, onclose, onerror, onmessage])

	// @ts-ignore
	const openWebSocketAfterBackoff = useCallback(() => {
		console.debug("[useWebSocket] Backing off for:", webSocketBackoffMs, "ms")
		return setTimeout(openWebSocket, webSocketBackoffMs)
	}, [openWebSocket, webSocketBackoffMs])

	useEffect(() => {
		if(!url) {
			return;
		}
		console.debug("[useWebSocket] Hook mounted, opening connection as soon as possible...")
		// @ts-ignore
		const handle = openWebSocketAfterBackoff()
		return () => {
			clearTimeout(handle)
		}
	}, [url, openWebSocketAfterBackoff])

	return {webSocket, webSocketState, openWebSocket, closeWebSocket}
}
