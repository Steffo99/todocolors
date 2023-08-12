import {TaskEditor} from "@/app/[lang]/board/[board]/(page)/(edit)/TaskEditor"
import {useTaskEditor} from "@/app/[lang]/board/[board]/(page)/useTaskEditor"
import cn from "classnames"
import style from "./BoardEditor.module.css"


export function BoardEditor({className, lang, editorHook}: {className?: string, lang: string, editorHook: ReturnType<typeof useTaskEditor>}) {
	return (
		<section className={cn(style.boardEditor, className)}>
			<TaskEditor lang={lang} editorHook={editorHook}/>
		</section>
	)
}
