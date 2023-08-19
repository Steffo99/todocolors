'use client';

import {useCallback, useEffect, useReducer, Reducer} from "react"

export interface WebSocketHandlerParams<E extends Event> {
	event: E,
	closeWebSocket: () => void,
}

export interface WebSocketHandlers {
	onclose?: (params: WebSocketHandlerParams<CloseEvent>) => void,
	onerror?: (params: WebSocketHandlerParams<Event>) => void,
	onmessage?: (params: WebSocketHandlerParams<MessageEvent>) => void,
	onopen?: (params: WebSocketHandlerParams<Event>) => void,
}

interface WebSocketState {
	webSocket: WebSocket | undefined,
	webSocketState: number | undefined,
	webSocketBackoffMs: number | undefined,
	nextBackOffMs: number
}

type WebSocketAction = { event: "connect", webSocket: WebSocket } | { event: "disconnect" } | { event: "backoffExpire" } | { event: "stateChange" };

function wsReducer(prevState: WebSocketState, action: WebSocketAction) {
	switch(action.event) {
		case "connect":
			return {
				webSocket: action.webSocket,
				webSocketState: action.webSocket.readyState,
                webSocketBackoffMs: prevState.nextBackOffMs,
                nextBackOffMs: prevState.nextBackOffMs * 2,
			}
		case "disconnect":
			return {
                ...prevState,
				webSocket: undefined,
				webSocketState: prevState.webSocket?.readyState,
			}
		case "backoffExpire":
			return {
				...prevState,
				webSocketBackoffMs: undefined,
			}
		case "stateChange":
			return {
				...prevState,
				webSocketState: prevState.webSocket?.readyState
			}
	}
}

export function useWs(url: string | undefined, {onclose, onerror, onmessage, onopen}: WebSocketHandlers) {
	const [{webSocket, webSocketState, webSocketBackoffMs}, dispatch] = useReducer<Reducer<WebSocketState, WebSocketAction>>(wsReducer, {webSocket: undefined, webSocketState: undefined, webSocketBackoffMs: undefined, nextBackOffMs: 1000})

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
		dispatch({event: "disconnect"})
	}, [webSocket])

	const openWebSocket = useCallback(() => {
		console.debug("[useWebSocket] Opening WebSocket:", url);
		if(url === undefined) {
			console.warn("[useWebSocket] Trying to open WebSocket, but no URL has been given; ignoring request...")
			return;
		}
		const sock = new WebSocket(url);
		dispatch({event: "connect", webSocket: sock})
		sock.onopen = (event) => {
			console.debug("[useWebSocket] Opened connection:", event)
			dispatch({event: "stateChange"})
			onopen?.({event, closeWebSocket});
		}
		sock.onclose = (event) => {
			console.debug("[useWebSocket] Closed connection:", event)
			dispatch({event: "disconnect"});
			onclose?.({event, closeWebSocket});
		}
		sock.onerror = (event) => {
			console.error("[useWebSocket] Error in connection:", event)
            dispatch({event: "stateChange"})
			onerror?.({event, closeWebSocket});
		}
		sock.onmessage = (event) => {
			console.debug("[useWebSocket] Received message:", event)
			onmessage?.({event, closeWebSocket});
		}
	}, [url, onopen, onclose, onerror, onmessage, closeWebSocket])

	useEffect(() => {
		if(webSocketBackoffMs === undefined) return;
		console.debug("[useWebSocket] Backing off for:", webSocketBackoffMs, "ms")
		new Promise(resolve => setTimeout(resolve, webSocketBackoffMs)).then(() => {
			dispatch({event: "backoffExpire"})
		})
	}, [webSocketBackoffMs])

	useEffect(() => {
		if(webSocket !== undefined) return;
		if(webSocketBackoffMs !== undefined) return;
		console.debug("[useWebSocket] Back off expired, opening websocket...")
		openWebSocket()
	}, [webSocket, webSocketBackoffMs, openWebSocket])

	return {webSocket, webSocketState, webSocketBackoffMs}
}
