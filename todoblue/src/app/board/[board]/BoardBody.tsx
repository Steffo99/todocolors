import {BoardColumns} from "@/app/board/[board]/BoardColumns"
import {BoardError} from "@/app/board/[board]/BoardError"
import {BoardMainLoading} from "@/app/board/[board]/BoardMainLoading"
import {useBoardContext} from "@/app/board/[board]/useBoardContext"


export function BoardBody() {
	const {websocketState} = useBoardContext()

	switch(websocketState) {
		case undefined:
			return <BoardMainLoading text={"Caricamento..."}/>
		case WebSocket.CONNECTING:
			return <BoardMainLoading text={"Connessione..."}/>
		case WebSocket.OPEN:
			return <BoardColumns/>
		case WebSocket.CLOSING:
		case WebSocket.CLOSED:
			return <BoardError text={"Errore"}/>
	}
}
