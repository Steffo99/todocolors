import {useClientTranslation} from "@/app/(i18n)/client"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {ColumningMode} from "@/app/[lang]/board/[board]/(page)/(view)/(columning)"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)"
import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)"
import {SplashWithIcon} from "@/app/[lang]/board/[board]/(page)/(view)/SplashWithIcon"
import {BoardViewer} from "@/app/[lang]/board/[board]/(page)/(view)/BoardViewer"
import {faLink, faLinkSlash, faGear, faAsterisk} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Dispatch, SetStateAction} from "react"


export function BoardMain({lang, className, columning, sorting, grouping, setEditorInput}: {lang: string, className?: string, columning: ColumningMode, grouping: GroupingMode, sorting: SortingMode[], setEditorInput: Dispatch<SetStateAction<string>>}) {
	const {t} = useClientTranslation(lang, "board")
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
			if(Object.keys(boardState.tasksById).length === 0) {
				return <SplashWithIcon
					icon={<FontAwesomeIcon size={"4x"} icon={faAsterisk}/>}
					text={t("boardEmpty")}
					className={className}
				/>
			}
			else {
				return <BoardViewer
					lang={lang}
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
				text={t("boardDisconnected", { retryingInSeconds: Math.ceil(webSocketBackoffMs ?? 0 / 1000).toString() })}
				className={className}
			/>
	}
}
