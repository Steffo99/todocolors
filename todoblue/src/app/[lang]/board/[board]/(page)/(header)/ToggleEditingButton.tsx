import {useClientTranslation} from "@/app/(i18n)/client"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import {faFloppyDisk, faPencil} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export function ToggleEditingButton({lang, metadataHook}: {lang: string, metadataHook: ReturnType<typeof useBoardMetadataEditor>}) {
    const {t} = useClientTranslation(lang, "board")
    const {isReady} = useBoardConsumer()

    if(!isReady) return null;

    return (
        <button
            title={metadataHook.isEditingMetadata ? t("stopEditingButtonTitle") : t("startEditingButtonTitle")}
            onClick={metadataHook.toggleEditingMetadata}
        >
            <FontAwesomeIcon icon={metadataHook.isEditingMetadata ? faFloppyDisk : faPencil}/>
        </button>
    )
}
