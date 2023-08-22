import {useClientTranslation} from "@/app/(i18n)/client"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import {faFloppyDisk, faPencil} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"


export function ToggleEditingButton({lang, metadataHook}: {lang: string, metadataHook: ReturnType<typeof useBoardMetadataEditor>}) {
    const {t} = useClientTranslation(lang, "board")
    const {isReady} = useBoardConsumer()

    if(!isReady) return null;

    return (
        <button
            title={metadataHook.isEditingMetadata ? t("stopEditingButtonTitle") : t("startEditingButtonTitle")}
            onClick={metadataHook.toggleEditingMetadata}
			className={cn(style.block, style.singleBlock)}
        >
            <FontAwesomeIcon icon={metadataHook.isEditingMetadata ? faFloppyDisk : faPencil}/>
        </button>
    )
}
