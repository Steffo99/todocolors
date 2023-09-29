import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"
import {ColumningMode} from "@/app/[lang]/board/[board]/(page)/(view)/(columning)"
import {GROUPING_MODE_TO_TITLE_COMPONENT, GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)"
import {TaskGroup} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/TaskGroup"
import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)"
import {TaskViewer} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskViewer"
import {useBoardTasksArranger} from "@/app/[lang]/board/[board]/(page)/(view)/useBoardTasksArranger"
import cn from "classnames"
import {TFunction} from "i18next"
import {Dispatch, SetStateAction} from "react"
import style from "./BoardViewer.module.css"


export function BoardViewer({className, t, columning, grouping, sorting, setEditorInput}: {className?: string, t: TFunction, columning: ColumningMode, grouping: GroupingMode, sorting: SortingMode[], setEditorInput: Dispatch<SetStateAction<string>>}) {
	const {boardState: {tasks}} = useBoardConsumer()
	const {taskGroups} = useBoardTasksArranger(tasks, grouping, sorting);

	return (
		<main className={cn(className, {
			[style.boardMainTaskGroups]: true,
			[style.boardMainTaskGroupsMultiColumn]: columning === ColumningMode.MultiColumn,
			[style.boardMainTaskGroupsSingleColumn]: columning === ColumningMode.SingleColumn,
		})}>
			{taskGroups.map((tg) => <BoardViewerColumn t={t} taskGroup={tg} key={tg.k} grouping={grouping} setEditorInput={setEditorInput}/>)}
		</main>
	)
}

export function BoardViewerColumn({t, grouping, taskGroup, setEditorInput}: {t: TFunction, grouping: GroupingMode, taskGroup: TaskGroup<string | number>, setEditorInput: Dispatch<SetStateAction<string>>}) {
	const ColumnTitle = GROUPING_MODE_TO_TITLE_COMPONENT[grouping]

	return (
		<div className={style.boardColumn}>
			<h3>
				<ColumnTitle t={t} k={taskGroup.k}/>
			</h3>
			<div className={style.boardColumnContents}>
				{taskGroup.tasks.map((task: TaskWithId) => <TaskViewer t={t} taskWithId={task} key={task[0]} setEditorInput={setEditorInput}/>)}
			</div>
		</div>
	)
}

