'use client';

import {useState, useEffect, useCallback} from "react"

export interface WebSocketHandlers {
	onclose?: (sock: WebSocket, event: CloseEvent) => void,
	onerror?: (sock: WebSocket, event: Event) => void,
	onmessage?: (sock: WebSocket, event: MessageEvent) => void,
	onopen?: (sock: WebSocket, event: Event) => void,
}

export function useWebSocket(url: string, {onclose, onerror, onmessage, onopen}: WebSocketHandlers) {
	const [websocket, setWebsocket] = useState<WebSocket | null>(null)
	const [websocketState, setWebsocketState] = useState<number>(0);

	useEffect(() => {
		console.debug("[useWebSocket] Creating websocket...");
		const sock = new WebSocket(url);
		setWebsocket(sock);
		sock.onopen = (ev) => {
			setWebsocketState(sock.readyState);
			onopen?.(sock, ev);
		}
		sock.onclose = (ev) => {
			setWebsocketState(sock.readyState);
			onclose?.(sock, ev);
		}
		sock.onerror = (ev) => {
			setWebsocketState(sock.readyState);
			onerror?.(sock, ev);
		}
		sock.onmessage = (ev) => {
			onmessage?.(sock, ev);
		}
		return () => {
			console.debug("[useWebSocket] Closing websocket...");
			sock.close();
			setWebsocket(null);
		}
	}, [url, onclose, onerror, onmessage, onopen])

	return {websocket, websocketState}
}
