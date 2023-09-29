import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {TFunction} from "i18next"


export function CycleSortingButton({t, next}: {t: TFunction, next: () => void}) {
	const {isReady} = useBoardConsumer()

	if(!isReady) return null;

	return (
		<button
			title={t("cycleSortingButtonTitle")}
			onClick={next}
			className={cn(style.block, style.singleBlock)}
		>
			<FontAwesomeIcon icon={faArrowDownWideShort}/>
		</button>
	)
}
