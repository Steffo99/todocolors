import {ConnectBoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)/ConnectBoardSignal"
import {DisconnectBoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)/DisconnectBoardSignal"
import {TaskBoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)/TaskBoardSignal"
import {TitleBoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)/TitleBoardSignal"


export type BoardSignal = TaskBoardSignal | TitleBoardSignal | ConnectBoardSignal | DisconnectBoardSignal;
