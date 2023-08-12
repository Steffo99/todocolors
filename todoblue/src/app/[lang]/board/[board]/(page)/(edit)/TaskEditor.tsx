import {useClientTranslation} from "@/app/(i18n)/client"
import {TASK_ICON_TO_FONTAWESOME_REGULAR} from "@/app/[lang]/board/[board]/(api)/(task)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {taskClassNames} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/taskClassNames"
import {useTaskEditor} from "@/app/[lang]/board/[board]/(page)/useTaskEditor"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {ChangeEvent, useCallback, useMemo, SyntheticEvent} from "react"
import style from "./TaskEditor.module.css"


export function TaskEditor({lang, className, editorHook: {input, setInput, task}}: {lang: string, className?: string, editorHook: ReturnType<typeof useTaskEditor>}) {
	const {t} = useClientTranslation(lang, "board")
	const {isReady, sendRequest} = useBoardConsumer()
	const inputClassName = useMemo(() => taskClassNames(task), [task])

	const submitTask = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault()
		sendRequest({"Task": [null, task]})
		setInput("")
	}, [sendRequest, task, setInput])

	if(!isReady) return null

	return (
		<div
			className={cn(className, style.taskEditorContainer)}
		>
			<form
				className={cn("panel", style.taskEditor, className, inputClassName)}
				onSubmit={submitTask}
			>
				<div className={style.taskEditorIcon}>
					<FontAwesomeIcon
						icon={TASK_ICON_TO_FONTAWESOME_REGULAR[task.icon]}
						size={"lg"}
					/>
				</div>
				<input
					className={style.taskEditorInput}
					type={"text"}
					placeholder={t("editorPlaceholder")}
					value={input}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
				/>
			</form>
		</div>
	)
}
