import {useClientTranslation} from "@/app/(i18n)/client"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons"


export function CycleSortingButton({lang, next}: {lang: string, next: () => void}) {
	const {isReady} = useBoardConsumer()
	const {t} = useClientTranslation(lang, "board")

	if(!isReady) return null;

	return (
		<button
			title={t("cycleSortingButtonTitle")}
			onClick={next}
		>
			<FontAwesomeIcon icon={faArrowDownWideShort}/>
		</button>
	)
}
