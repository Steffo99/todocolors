import {LockBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {TFunction} from "i18next"
import {useCallback} from "react"


export function ToggleLockedButton({t}: {t: TFunction}) {
	const {isReady, boardState: {locked}, sendRequest} = useBoardConsumer()

	const toggleLock = useCallback(() => {
		const request: LockBoardRequest = {"Lock": !locked}
		sendRequest(request)
	}, [locked, sendRequest])

	if(!isReady) return null;

	// FIXME
    return (
        <button
            title={locked ? t("lockButtonTitle") : t("unlockButtonTitle")}
            onClick={toggleLock}
			className={cn(style.block, style.singleBlock)}
        >
            <FontAwesomeIcon icon={locked ? faLock : faLockOpen}/>
        </button>
    )
}
