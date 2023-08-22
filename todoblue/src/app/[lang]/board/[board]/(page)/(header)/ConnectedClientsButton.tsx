import {useClientTranslation} from "@/app/(i18n)/client"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUsers} from "@fortawesome/free-solid-svg-icons"
import cn from "classnames"


export function ConnectedClientsButton({lang}: {lang: string}) {
	const {isReady, boardState: {connectedClients}} = useBoardConsumer()
	const {t} = useClientTranslation(lang, "board")

	if(!isReady) return null;

	return (
		<div
			title={t("privacyButtonTitle")}
			className={cn(style.block, style.doubleBlock)}
		>
			<FontAwesomeIcon icon={faUsers}/>
			&nbsp;
			{connectedClients.length}
		</div>
	)
}
