import {useClientTranslation} from "@/app/(i18n)/client"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faObjectGroup} from "@fortawesome/free-solid-svg-icons"


export function CycleGroupingButton({lang, next}: {lang: string, next: () => void}) {
	const {isReady} = useBoardConsumer()
	const {t} = useClientTranslation(lang, "board")

	if(!isReady) return null;

	return (
		<button
			title={t("cycleGroupingButtonTitle")}
			onClick={next}
		>
			<FontAwesomeIcon icon={faObjectGroup}/>
		</button>
	)
}
