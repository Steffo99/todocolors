import {DeleteTaskBoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)/DeleteTaskBoardSignal"
import {UpdateTaskBoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)/UpdateTaskBoardSignal"


/**
 * **Object** signaling an alteration to a {@link Task} related to the board.
 */
export type TaskBoardSignal = UpdateTaskBoardSignal | DeleteTaskBoardSignal;
