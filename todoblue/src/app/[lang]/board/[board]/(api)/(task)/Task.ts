import {TaskIcon} from "@/app/[lang]/board/[board]/(api)/(task)/TaskIcon"
import {TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)/TaskImportance"
import {TaskPriority} from "@/app/[lang]/board/[board]/(api)/(task)/TaskPriority"


export type Task = {
	text: string,
	icon: TaskIcon,
	importance: TaskImportance,
	priority: TaskPriority,
	created_on: number | null,
	started_on: number | null,
	completed_on: number | null,
	journaled_on: number | null,
}
