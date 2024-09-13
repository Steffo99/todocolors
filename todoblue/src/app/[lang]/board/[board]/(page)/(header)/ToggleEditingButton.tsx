import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderButtons.module.css"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import {fas} from "@awesome.me/kit-dfe340c874/icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {TFunction} from "i18next"


export function ToggleEditingButton({t, metadataHook}: {t: TFunction, metadataHook: ReturnType<typeof useBoardMetadataEditor>}) {
    const {isReady, boardState: {locked}} = useBoardConsumer()

    if(!isReady) return null;
	if(locked) return null;

    return (
        <button
            title={metadataHook.isEditingMetadata ? t("stopEditingButtonTitle") : t("startEditingButtonTitle")}
            onClick={metadataHook.toggleEditingMetadata}
			className={cn(style.block, style.singleBlock)}
        >
            <FontAwesomeIcon icon={fas[metadataHook.isEditingMetadata ? "faFloppyDisk" : "faPencil"]}/>
        </button>
    )
}
