import {TaskId} from "@/app/[lang]/board/[board]/(api)/(task)"


/**
 * **Object** signaling the deletion of the {@link Task} with the given {@link TaskId} from the board.
 */
export type DeleteTaskBoardSignal = {
	"Task": [
		TaskId,
		null
	]
}
