import {BoardMainIcon} from "@/app/board/[board]/BoardMainIcon"
import {BoardMainTaskGroups} from "@/app/board/[board]/BoardMainTaskGroups"
import {useManagedBoard} from "@/app/board/[board]/BoardManager"
import {faArrowsSpin, faExclamationCircle, faGear} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"


export function BoardMain({className}: {className?: string}) {
	const {websocketState} = useManagedBoard()

	switch(websocketState) {
		case undefined:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faGear} spin/>} text={"Caricamento..."} className={className}/>
		case WebSocket.CONNECTING:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faArrowsSpin} spin/>} text={"Connessione..."} className={className}/>
		case WebSocket.OPEN:
			return <BoardMainTaskGroups className={className}/>
		case WebSocket.CLOSING:
		case WebSocket.CLOSED:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faExclamationCircle}/>} text={"Errore"} className={cn("red", className)}/>
	}
}
