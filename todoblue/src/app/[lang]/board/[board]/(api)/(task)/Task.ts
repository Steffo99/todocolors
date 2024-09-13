import {TaskImportance} from "@/app/[lang]/board/[board]/(api)/(task)/TaskImportance"


export type Task = {
	text: string,
	icon: string,
	importance: TaskImportance,
	deadline: number | null,
	created_on: number | null,
	started_on: number | null,
	completed_on: number | null,
	journaled_on: number | null,
}
