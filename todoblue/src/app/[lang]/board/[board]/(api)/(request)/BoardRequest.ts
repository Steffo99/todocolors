import {LockBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)/LockBoardRequest"
import {TaskBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)/TaskBoardRequest"
import {TitleBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)/TitleBoardRequest"
import {TrimBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)/TrimBoardRequest"


/**
 * **Object** requesting the server to perform a certain action on the board.
 */
export type BoardRequest = TitleBoardRequest | TaskBoardRequest | LockBoardRequest | TrimBoardRequest;
