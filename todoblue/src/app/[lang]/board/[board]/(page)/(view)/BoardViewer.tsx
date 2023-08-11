import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {ColumningMode} from "@/app/[lang]/board/[board]/(page)/(view)/(columning)"
import {GROUPING_MODE_TO_TITLE_COMPONENT, GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)"
import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)"
import {TaskGroup} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskGroup"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskWithId"
import {TaskViewer} from "@/app/[lang]/board/[board]/(page)/(view)/TaskViewer"
import {useBoardTasksArranger} from "@/app/[lang]/board/[board]/(page)/(view)/useBoardTasksArranger"
import cn from "classnames"
import {Dispatch, SetStateAction} from "react"
import style from "./BoardViewer.module.css"


export function BoardViewer({className, lang, columning, grouping, sorting, setEditorInput}: {className?: string, lang: string, columning: ColumningMode, grouping: GroupingMode, sorting: SortingMode[], setEditorInput: Dispatch<SetStateAction<string>>}) {
	const {boardState: {tasksById}} = useBoardConsumer()
	const {taskGroups} = useBoardTasksArranger(tasksById, grouping, sorting);

	return (
		<main className={cn(className, {
			[style.boardMainTaskGroups]: true,
			[style.boardMainTaskGroupsMultiColumn]: columning === ColumningMode.MultiColumn,
			[style.boardMainTaskGroupsSingleColumn]: columning === ColumningMode.SingleColumn,
		})}>
			{taskGroups.map((tg) => <BoardViewerColumn lang={lang} taskGroup={tg} key={tg.k} grouping={grouping} setEditorInput={setEditorInput}/>)}
		</main>
	)
}

export function BoardViewerColumn({lang, grouping, taskGroup, setEditorInput}: {lang: string, grouping: GroupingMode, taskGroup: TaskGroup<string | number>, setEditorInput: Dispatch<SetStateAction<string>>}) {
	const ColumnTitle = GROUPING_MODE_TO_TITLE_COMPONENT[grouping]

	return (
		<div className={style.boardColumn}>
			<h3>
				<ColumnTitle lang={lang} k={taskGroup.k}/>
			</h3>
			<div className={style.boardColumnContents}>
				{taskGroup.tasks.map((task: TaskWithId) => <TaskViewer lang={lang} task={task} key={task[0]} setEditorInput={setEditorInput}/>)}
			</div>
		</div>
	)
}

