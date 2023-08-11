import {TaskId} from "@/app/[lang]/board/[board]/(api)/(task)"


/**
 * **Object** requesting the deletion of the {@link Task} with the given {@link TaskId} from the board.
 */
export type DeleteTaskBoardRequest = {
	"Task": [
		TaskId,
		null
	]
}
