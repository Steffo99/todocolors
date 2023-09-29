import {DeleteTaskBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/DeleteTaskBoardChange"
import {UpdateTaskBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/UpdateTaskBoardChange"


/**
 * **Object** signaling an alteration to a {@link Task} related to the board.
 */
export type TaskBoardChange = UpdateTaskBoardChange | DeleteTaskBoardChange;
