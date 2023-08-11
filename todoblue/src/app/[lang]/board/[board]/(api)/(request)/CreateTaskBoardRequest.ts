import {Task} from "@/app/[lang]/board/[board]/(api)/(task)"

/**
 * **Object** requesting the creation of a new {@link Task} on the board.
 */
export type CreateTaskBoardRequest = {
	"Task": [
		null,
		Task
	]
}
