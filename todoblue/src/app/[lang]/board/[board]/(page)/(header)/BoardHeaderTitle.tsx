import {usePageTitleSetter} from "@/app/(utils)/usePageTitleSetter"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import style from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderTitle.module.css"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import cn from "classnames"
import {useMemo} from "react"


export function BoardHeaderTitle({className, editorHook}: {className?: string, editorHook: ReturnType<typeof useBoardMetadataEditor>}) {
	const {isReady, boardState: {title: titleFromState}} = useBoardConsumer()

	const pageTitle = useMemo(() => {
		return titleFromState.length > 0 ? `${titleFromState} - Todocolors` : "Todocolors"
	}, [titleFromState])
	usePageTitleSetter(pageTitle)

	if(!isReady) return null;

	let contents;
	if(editorHook.isEditingMetadata) {
		contents = (
			<form
				className={style.boardHeaderTitleEditor}
				onSubmit={editorHook.stopEditingMetadata}
			>
				<input
					className={style.boardHeaderTitleInput}
					type={"text"}
					placeholder={"Titolo"}
					onChange={(e) => editorHook.setTitleFromEditor(e.target.value)}
					value={editorHook.titleFromEditor}
				/>
			</form>
		)
	}
	else {
		contents = (
			<div
				className={style.boardHeaderTitleDisplay}
			>
				{titleFromState}
			</div>
		)
	}

	return (
		<h1 className={cn(style.boardHeaderTitle, className)}>
			{contents}
		</h1>
	)
}
