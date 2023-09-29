import style from "@/app/[lang]/board/[board]/(page)/(edit)/(task)/TaskEditor.module.css"
import {TFunction} from "i18next"
import {ChangeEvent, Dispatch, SetStateAction} from "react"


export function TaskEditorInput({t, input, setInput}: {t: TFunction, input: string, setInput: Dispatch<SetStateAction<string>>}) {
    return (
        <input
            className={style.taskEditorInput}
            type={"text"}
            placeholder={t("editorPlaceholder")}
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        />
    )
}
