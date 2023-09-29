import {TrimBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {faScissors} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {TFunction} from "i18next"
import {useCallback} from "react"


export function TrimButton({t}: {t: TFunction}) {
	const {isReady, boardState: {locked}, sendRequest} = useBoardConsumer()

	const requestTrim = useCallback(() => {
		const request: TrimBoardRequest = {"Trim": null}
		sendRequest(request)
	}, [locked, sendRequest])

	if(!isReady) return null;
	if(!locked) return null;

    return (
        <button
            title={t("trimButtonTitle")}
            onClick={requestTrim}
			className={cn(style.block, style.singleBlock)}
        >
            <FontAwesomeIcon icon={faScissors}/>
        </button>
    )
}
