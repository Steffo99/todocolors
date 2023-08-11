import {useClientTranslation} from "@/app/(i18n)/client"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {COLUMNING_MODE_TO_ICON, ColumningMode} from "../(view)/(columning)"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export function CycleColumningButton({lang, value, next}: {lang: string, value: ColumningMode, next: () => void}) {
	const {isReady} = useBoardConsumer()
	const {t} = useClientTranslation(lang, "board")

	if(!isReady) return null;

	return (
		<button
			title={t("cycleColumningButtonTitle")}
			onClick={next}
		>
			<FontAwesomeIcon icon={COLUMNING_MODE_TO_ICON[value]}/>
		</button>
	)
}
