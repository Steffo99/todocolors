'use client';
import {default as React} from "react";


export interface UseWsHandlers {
	onclose?: (sock: WebSocket, event: CloseEvent) => void,
	onerror?: (sock: WebSocket, event: Event) => void,
	onmessage?: (sock: WebSocket, event: MessageEvent) => void,
	onopen?: (sock: WebSocket, event: Event) => void,
}


export function useWs(url: string, {onclose, onerror, onmessage, onopen}: UseWsHandlers) {
	const [websocket, setWebsocket] = React.useState<WebSocket | null>(null)

	React.useEffect(() => {
		const sock = new WebSocket(url);
		sock.onclose = onclose ? (ev) => onclose(sock, ev) : null;
		sock.onerror = onerror ? (ev) => onerror(sock, ev) : null;
		sock.onmessage = onmessage ? (ev) => onmessage(sock, ev) : null;
		sock.onopen = onopen ? (ev) => onopen(sock, ev) : null;
		setWebsocket(sock);
		return () => {
			sock.close();
			setWebsocket(null);
		}
	}, [url, onclose, onerror, onmessage, onopen])

	return websocket
}
