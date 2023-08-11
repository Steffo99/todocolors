"use client";

import {BoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)"
import {boardReducer} from "@/app/[lang]/board/[board]/(api)/(state)/boardReducer"
import {BoardState} from "@/app/[lang]/board/[board]/(api)/(state)/BoardState"
import {Reducer, useReducer} from "react"

export function useBoardState() {
    const [boardState, processBoardSignal] = useReducer<Reducer<BoardState, BoardSignal | null>>(boardReducer, {title: "", tasksById: {}})

    return {boardState, processBoardSignal}
}
