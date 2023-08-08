import {BoardMainIcon} from "@/app/[lang]/board/[board]/BoardMainIcon"
import {BoardMainTaskGroups} from "@/app/[lang]/board/[board]/BoardMainTaskGroups"
import {useManagedBoard} from "@/app/[lang]/board/[board]/BoardManager"
import {faLink, faLinkSlash, faGear, faAsterisk} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export function BoardMain({className}: {className?: string}) {
	const {webSocketState, webSocketBackoffMs, taskGroups} = useManagedBoard()

	switch(webSocketState) {
		case undefined:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faGear} beatFade/>} text={"Caricamento..."} className={className}/>
		case WebSocket.CONNECTING:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faLink} beatFade/>} text={"Connessione..."} className={className}/>
		case WebSocket.OPEN:
			if(taskGroups.length === 0) {
				return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faAsterisk}/>} text={"Nulla da visualizzare"} className={className}/>
			}
			else {
				return <BoardMainTaskGroups className={className}/>
			}
		case WebSocket.CLOSING:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faLinkSlash} beatFade/>} text={"Disconnessione..."} className={className}/>
		case WebSocket.CLOSED:
			return <BoardMainIcon icon={<FontAwesomeIcon size={"4x"} icon={faLinkSlash}/>} text={`Disconnesso, riconnessione tra ${webSocketBackoffMs}ms`} className={className}/>
	}
}
