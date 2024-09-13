"use client";

import {useClientTranslation} from "@/app/(i18n)/client"
import {BoardEditor} from "@/app/[lang]/board/[board]/(page)/(edit)/BoardEditor"
import {BoardHeader} from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeader"
import {BoardMain} from "@/app/[lang]/board/[board]/(page)/(view)/BoardMain"
import {useBoardLayoutEditor} from "@/app/[lang]/board/[board]/(page)/useBoardLayoutEditor"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import {useTaskEditor} from "@/app/[lang]/board/[board]/(page)/useTaskEditor"
import style from "@/app/[lang]/board/[board]/page.module.css"
import {TFunction} from "i18next"


export function BoardPage({lang}: {lang: string}) {
	const internationalization = useClientTranslation(lang, "board")
	const metadataHook = useBoardMetadataEditor()
	const layoutHook = useBoardLayoutEditor()
	const editorHook = useTaskEditor(lang)

	const t = internationalization.t as TFunction

	return (
		<div className={style.pageRoot}>
			<BoardHeader
				t={t}
				className={style.pageHeader}
				metadataHook={metadataHook}
				layoutHook={layoutHook}
			/>
			<BoardMain
				lang={lang}
				t={t}
				className={style.pageMain}
				columning={layoutHook.columningHook.value}
				grouping={layoutHook.groupingHook.value}
				sorting={layoutHook.sortingHook.value}
				setEditorInput={editorHook.setInput}
			/>
			<BoardEditor
				t={t}
				className={style.pageEditor}
				editorHook={editorHook}
			/>
		</div>
	)
}
