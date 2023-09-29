import {Task, TaskId} from "@/app/[lang]/board/[board]/(api)/(task)"


/**
 * **Object** signaling the creation of a new {@link Task} with the given {@link TaskId} or a modification of the {@link Task} already on the board with the given {@link TaskId}.
 */
export type UpdateTaskBoardChange = {
	"Task": [
		TaskId,
		Task,
	]
}
