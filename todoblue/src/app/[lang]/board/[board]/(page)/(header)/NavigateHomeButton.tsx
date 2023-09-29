import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {faHouse} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {TFunction} from "i18next"
import {useRouter} from "next/navigation"
import {useCallback} from "react"


export function NavigateHomeButton({t}: {t: TFunction}) {
    const router = useRouter()
    const goHome = useCallback(() => router.push("/"), [router])

    return (
        <button
			title={t("navigateHomeButtonTitle")}
			onClick={goHome}
			className={cn(style.block, style.singleBlock)}
		>
            <FontAwesomeIcon icon={faHouse}/>
        </button>
    )
}
