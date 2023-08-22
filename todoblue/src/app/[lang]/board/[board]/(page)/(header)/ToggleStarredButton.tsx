import {useClientTranslation} from "@/app/(i18n)/client"
import {useStarredConsumer} from "@/app/[lang]/(layout)/(contextStarred)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons"
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"


export function ToggleStarredButton({lang}: {lang: string}) {
    const {t} = useClientTranslation(lang, "board")
	const {boardName} = useBoardConsumer()
    const {isStarred, toggleStarred} = useStarredConsumer()
    const thisIsStarred = isStarred(boardName)

    return (
        <button
            title={thisIsStarred ? t("removeStarredButtonTitle") : t("addStarredButtonTitle")}
            onClick={() => toggleStarred(boardName)}
			className={cn(style.block, style.singleBlock)}
        >
            <FontAwesomeIcon icon={thisIsStarred ? faStarSolid : faStarRegular}/>
        </button>
    )
}
