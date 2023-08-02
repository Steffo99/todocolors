'use client';

import {BoardAction, Task} from "@/app/board/[board]/types"
import {useMemo, useCallback, useState} from "react"
import {useWebSocket} from "@/app/board/[board]/useWebSocket"


export function useBoardWebSocket(board: string) {
	const url = useMemo(() => `ws://127.0.0.1:8080/board/${board}/ws`, [board]);
	const [title, setTitle] = useState<string>("Nuovo tabellone");
	const [tasks, setTasks] = useState<{[key: string]: Task}>(() => ({}));

	const onopen = useCallback((sock: WebSocket, event: Event) => {
		setTasks(() => ({}))
		console.debug("[useBoardWebSocket] Connected to the websocket of board:", board);
	}, [])

	const onmessage = useCallback((sock: WebSocket, event: MessageEvent) => {
		const data: BoardAction = JSON.parse(event.data);
		console.debug("[useBoardWebSocket] Received:", data);
		if(data["Title"] !== undefined) {
			setTitle(data["Title"]);
		}
		else if(data["Task"] !== undefined) {
			const id = data["Task"][0]
			const task = data["Task"][1]
			setTasks((prevTasks) => {
				const tasks = {...prevTasks}
				if(task === null) {
					delete tasks[id]
				}
				else {
					tasks[id] = task
				}
				return tasks
			})
		}
	}, [])

	const {websocket} = useWebSocket(url, {onopen, onmessage});
	const readyState = websocket?.readyState;

	const pushEvent = useCallback((data: any) => {
		if(!websocket) {
			console.warn("[useBoardWebSocket] Socket does not exist yet, cannot send:", data)
			return;
		}
		if(readyState != 1) {
			console.warn("[useBoardWebSocket] Socket isn't ready yet, cannot send:", data);
			return;
		}
		console.debug("[useBoardWebSocket] Sending:", data);
		websocket.send(JSON.stringify(data));
	}, [websocket, readyState])

	return {title, tasks, pushEvent, readyState}
}
