import {useClientTranslation} from "@/app/(i18n)/client"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {faHouse} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {useRouter} from "next/navigation"
import {useCallback} from "react"


export function NavigateHomeButton({lang}: {lang: string}) {
    const {t} = useClientTranslation(lang, "board")
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
