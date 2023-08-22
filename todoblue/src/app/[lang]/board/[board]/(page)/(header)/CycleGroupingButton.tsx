import {useClientTranslation} from "@/app/(i18n)/client"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faObjectGroup} from "@fortawesome/free-solid-svg-icons"
import cn from "classnames"


export function CycleGroupingButton({lang, next}: {lang: string, next: () => void}) {
	const {isReady} = useBoardConsumer()
	const {t} = useClientTranslation(lang, "board")

	if(!isReady) return null;

	return (
		<button
			title={t("cycleGroupingButtonTitle")}
			onClick={next}
			className={cn(style.block, style.singleBlock)}
		>
			<FontAwesomeIcon icon={faObjectGroup}/>
		</button>
	)
}
