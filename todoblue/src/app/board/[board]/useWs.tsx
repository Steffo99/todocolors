'use client';
import {default as React} from "react";


export interface UseWsHandlers {
	onclose?: (event: CloseEvent) => void,
	onerror?: (event: Event) => void,
	onmessage?: (event: MessageEvent) => void,
	onopen?: (event: Event) => void,
}


export function useWs(url: string, {onclose, onerror, onmessage, onopen}: UseWsHandlers) {
	const [websocket, setWebsocket] = React.useState<WebSocket | null>(null)

	React.useEffect(() => {
		const sock = new WebSocket(url);
		sock.onclose = onclose ?? null;
		sock.onerror = onerror ?? null;
		sock.onmessage = onmessage ?? null;
		sock.onopen = onopen ?? null;
		setWebsocket(sock);
		return () => {
			sock.close();
			setWebsocket(null);
		}
	}, [url, onclose, onerror, onmessage, onopen])

	return websocket
}
