"use client";

import {TaskEditor} from "@/app/[lang]/board/[board]/(page)/(edit)/TaskEditor"
import {BoardHeader} from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeader"
import {BoardMain} from "@/app/[lang]/board/[board]/(page)/(view)/BoardMain"
import {useBoardLayoutEditor} from "@/app/[lang]/board/[board]/(page)/useBoardLayoutEditor"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import {useTaskEditor} from "@/app/[lang]/board/[board]/(page)/useTaskEditor"
import style from "@/app/[lang]/board/[board]/page.module.css"


export function BoardPage({lang}: {lang: string}) {
	const metadataHook = useBoardMetadataEditor()
	const layoutHook = useBoardLayoutEditor()
	const editorHook = useTaskEditor()

	return (
		<div className={style.pageRoot}>
			<BoardHeader
				lang={lang}
				className={style.pageHeader}
				metadataHook={metadataHook}
				layoutHook={layoutHook}
			/>
			<BoardMain
				lang={lang}
				className={style.pageMain}
				columning={layoutHook.columningHook.value}
				grouping={layoutHook.groupingHook.value}
				sorting={layoutHook.sortingHook.value}
				setEditorInput={editorHook.setInput}
			/>
			<TaskEditor
				lang={lang}
				className={style.pageEditor}
				editorHook={editorHook}
			/>
		</div>
	)
}
