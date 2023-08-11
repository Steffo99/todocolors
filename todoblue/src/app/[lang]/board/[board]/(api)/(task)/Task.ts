import {TaskIcon} from "@/app/[lang]/board/[board]/(api)/(task)/TaskIcon"
import {TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)/TaskImportance"
import {TaskPriority} from "@/app/[lang]/board/[board]/(api)/(task)/TaskPriority"
import {TaskStatus} from "@/app/[lang]/board/[board]/(api)/(task)/TaskStatus"


export type Task = {
	text: string,
	icon: TaskIcon,
	importance: TaskImportance,
	priority: TaskPriority,
	status: TaskStatus,
}
