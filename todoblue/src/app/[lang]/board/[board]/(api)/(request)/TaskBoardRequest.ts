import {CreateTaskBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)/CreateTaskBoardRequest"
import {DeleteTaskBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)/DeleteTaskBoardRequest"
import {ModifyTaskBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)/ModifyTaskBoardRequest"


/**
 * **Object** requesting an alteration to a {@link Task} related to the board.
 */
export type TaskBoardRequest = CreateTaskBoardRequest | ModifyTaskBoardRequest | DeleteTaskBoardRequest
