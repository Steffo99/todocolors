import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {faUsers} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {TFunction} from "i18next"


export function ConnectedClientsButton({t}: {t: TFunction}) {
	const {isReady, boardState: {clients}} = useBoardConsumer()

	if(!isReady) return null;

	return (
		<div
			title={t("privacyButtonTitle")}
			className={cn(style.block, style.singleBlock)}
		>
			<FontAwesomeIcon icon={faUsers} size={"2xs"}/>
			&nbsp;
			{clients.length}
		</div>
	)
}
