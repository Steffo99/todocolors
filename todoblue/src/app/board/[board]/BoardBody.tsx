import {BoardMainTaskGroups} from "@/app/board/[board]/BoardMainTaskGroups"
import {BoardMainIcon} from "@/app/board/[board]/BoardMainIcon"
import {useBoardContext} from "@/app/board/[board]/useBoardContext"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGear, faArrowsSpin, faExclamationCircle} from "@fortawesome/free-solid-svg-icons"


export function BoardBody() {
	const {websocketState} = useBoardContext()

	switch(websocketState) {
		case undefined:
			return <BoardMainIcon icon={<FontAwesomeIcon icon={faGear} spin/>} text={"Caricamento..."}/>
		case WebSocket.CONNECTING:
			return <BoardMainIcon icon={<FontAwesomeIcon icon={faArrowsSpin} spin/>} text={"Connessione..."}/>
		case WebSocket.OPEN:
			return <BoardMainTaskGroups/>
		case WebSocket.CLOSING:
		case WebSocket.CLOSED:
			return <BoardMainIcon icon={<FontAwesomeIcon icon={faExclamationCircle}/>} text={"Errore"} className={"red"}/>
	}
}
