import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {TFunction} from "i18next"
import {COLUMNING_MODE_TO_ICON, ColumningMode} from "../(view)/(columning)"


export function CycleColumningButton({t, value, next}: {t: TFunction, value: ColumningMode, next: () => void}) {
	const {isReady} = useBoardConsumer()

	if(!isReady) return null;

	return (
		<button
			title={t("cycleColumningButtonTitle")}
			onClick={next}
			className={cn(style.block, style.singleBlock)}
		>
			<FontAwesomeIcon icon={COLUMNING_MODE_TO_ICON[value]}/>
		</button>
	)
}
