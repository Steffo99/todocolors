import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {ColumningMode} from "@/app/[lang]/board/[board]/(page)/(view)/(columning)"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)"
import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)"
import {BoardViewer} from "@/app/[lang]/board/[board]/(page)/(view)/BoardViewer"
import {SplashWithIcon} from "@/app/[lang]/board/[board]/(page)/(view)/SplashWithIcon"
import {faAsterisk, faGear, faLink, faLinkSlash} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {TFunction} from "i18next"
import {Dispatch, SetStateAction} from "react"


export function BoardMain({t, className, columning, sorting, grouping, setEditorInput}: {t: TFunction, className?: string, columning: ColumningMode, grouping: GroupingMode, sorting: SortingMode[], setEditorInput: Dispatch<SetStateAction<string>>}) {
	const {webSocketState, webSocketBackoffMs, boardState} = useBoardConsumer()

	switch(webSocketState) {
		case undefined:
			return <SplashWithIcon
				icon={<FontAwesomeIcon size={"4x"} icon={faGear} beatFade/>}
				text={t("boardPreparing")}
				className={className}
			/>
		case WebSocket.CONNECTING:
			return <SplashWithIcon
				icon={<FontAwesomeIcon size={"4x"} icon={faLink} beatFade/>}
				text={t("boardConnecting")}
				className={className}
			/>
		case WebSocket.OPEN:
			if(Object.keys(boardState.tasks).length === 0) {
				return <SplashWithIcon
					icon={<FontAwesomeIcon size={"4x"} icon={faAsterisk}/>}
					text={t("boardEmpty")}
					className={className}
				/>
			}
			else {
				return <BoardViewer
					t={t}
					columning={columning}
					sorting={sorting}
					grouping={grouping}
					setEditorInput={setEditorInput}
					className={className}
				/>
			}
		case WebSocket.CLOSING:
			return <SplashWithIcon
				icon={<FontAwesomeIcon size={"4x"} icon={faLinkSlash} beatFade/>}
				text={t("boardDisconnecting")}
				className={className}
			/>
		case WebSocket.CLOSED:
			return <SplashWithIcon
				icon={<FontAwesomeIcon size={"4x"} icon={faLinkSlash}/>}
				text={t("boardDisconnected", { retryingInSeconds: Math.ceil((webSocketBackoffMs ?? 0) / 1000).toString() })}
				className={className}
			/>
	}
}
