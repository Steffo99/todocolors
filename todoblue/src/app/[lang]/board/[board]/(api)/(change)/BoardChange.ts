import {ConnectBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/ConnectBoardChange"
import {DisconnectBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/DisconnectBoardChange"
import {LockBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/LockBoardChange"
import {StateBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/StateBoardChange"
import {TaskBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/TaskBoardChange"
import {TitleBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/TitleBoardChange"


export type BoardChange = TaskBoardChange | TitleBoardChange | ConnectBoardChange | DisconnectBoardChange | LockBoardChange | StateBoardChange;
