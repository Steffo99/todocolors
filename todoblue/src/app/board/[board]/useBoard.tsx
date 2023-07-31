'use client';

import {default as React} from "react";
import {useWs} from "@/app/board/[board]/useWs"


export function useBoard(url: string) {
	const socket = useWs(url, {
		onopen: React.useCallback((sock: WebSocket, event: Event) => {
			console.debug("[useBoard] Connected to the server!");
			sock.send('{"Title": "sus"}')
		}, []),
		onmessage: React.useCallback((sock: WebSocket, event: MessageEvent) => {
			const data = JSON.parse(event.data);
			console.debug("[useBoard] Received ServerOperation: ", data);
		}, [])
	});
}
