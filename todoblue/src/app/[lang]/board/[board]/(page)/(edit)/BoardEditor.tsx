import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {TaskEditor} from "@/app/[lang]/board/[board]/(page)/(edit)/(task)/TaskEditor"
import {useTaskEditor} from "@/app/[lang]/board/[board]/(page)/useTaskEditor"
import cn from "classnames"
import {TFunction} from "i18next"
import style from "./BoardEditor.module.css"


export function BoardEditor({className, lang, t, editorHook}: {className?: string, lang: string, t: TFunction, editorHook: ReturnType<typeof useTaskEditor>}) {
	const {boardState: {locked}} = useBoardConsumer()

	if(locked) return null;

	return (
		<section className={cn(style.boardEditor, className)}>
			<TaskEditor lang={lang} t={t} editorHook={editorHook}/>
		</section>
	)
}
