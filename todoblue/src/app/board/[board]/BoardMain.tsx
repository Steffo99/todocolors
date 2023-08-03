import {BoardMainTaskGroups} from "@/app/board/[board]/BoardMainTaskGroups"
import {BoardMainIcon} from "@/app/board/[board]/BoardMainIcon"
import {useManagedBoard} from "@/app/board/[board]/BoardManager"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGear, faArrowsSpin, faExclamationCircle} from "@fortawesome/free-solid-svg-icons"


export function BoardMain() {
	const {websocketState} = useManagedBoard()

	switch(websocketState) {
		case undefined:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faGear} spin/>} text={"Caricamento..."}/>
		case WebSocket.CONNECTING:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faArrowsSpin} spin/>} text={"Connessione..."}/>
		case WebSocket.OPEN:
			return <BoardMainTaskGroups/>
		case WebSocket.CLOSING:
		case WebSocket.CLOSED:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faExclamationCircle}/>} text={"Errore"} className={"red"}/>
	}
}
