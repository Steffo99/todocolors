import {Task, TaskId} from "@/app/[lang]/board/[board]/(api)/(task)"


/**
 * **Object** requesting the modification of the {@link Task} already on the board with the given {@link TaskId}.
 */
export type ModifyTaskBoardRequest = {
	"Task": [
		TaskId,
		Task,
	]
}
