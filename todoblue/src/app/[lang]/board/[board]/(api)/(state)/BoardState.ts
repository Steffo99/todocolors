import {Task} from "@/app/[lang]/board/[board]/(api)/(task)"


/**
 * **Object** containing information about the state of the board in a given moment.
 */
export type BoardState = {
	title: string,
	tasks: {[key: string]: Task},
	clients: string[],
	locked: boolean,
}
