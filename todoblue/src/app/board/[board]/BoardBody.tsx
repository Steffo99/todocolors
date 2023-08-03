import {BoardError} from "@/app/board/[board]/BoardError"
import {BoardLoading} from "@/app/board/[board]/BoardLoading"
import {useBoardContext} from "@/app/board/[board]/useBoardContext"


export function BoardBody() {
	const {websocketState} = useBoardContext()

	switch(websocketState) {
		case undefined:
			return <BoardLoading text={"Caricamento..."}/>
		case WebSocket.CONNECTING:
			return <BoardLoading text={"Connessione..."}/>
		case WebSocket.OPEN:
			return <>nothing here</>
		case WebSocket.CLOSING:
		case WebSocket.CLOSED:
			return <BoardError text={"Errore"}/>
	}
}
