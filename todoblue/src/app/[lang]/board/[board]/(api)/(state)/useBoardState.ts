"use client";

import {boardReducer} from "@/app/[lang]/board/[board]/(api)/(state)/boardReducer"
import {BoardState} from "@/app/[lang]/board/[board]/(api)/(state)/BoardState"
import {DEFAULT_BOARD_STATE} from "@/app/[lang]/board/[board]/(api)/(state)/defaultBoardState"
import {Reducer, useReducer} from "react"
import {BoardChange} from "../(change)"


export function useBoardState() {
    const [boardState, processBoardChange] = useReducer<Reducer<BoardState, BoardChange | null>>(boardReducer, DEFAULT_BOARD_STATE)

    return {boardState, processBoardChange}
}
