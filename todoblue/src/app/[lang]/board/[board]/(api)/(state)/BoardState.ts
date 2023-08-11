import {Task} from "@/app/[lang]/board/[board]/(api)/(task)"


/**
 * **Object** containing information about the state of the board in a given moment.
 */
export type BoardState = {
	title: string,
	tasksById: {[key: string]: Task},
}
