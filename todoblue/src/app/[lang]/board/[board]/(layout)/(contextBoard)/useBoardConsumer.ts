"use client";
import {BoardContext} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)/BoardContext"
import {useContext} from "react"


export function useBoardConsumer() {
    const context = useContext(BoardContext)

    if(context === null) {
        throw Error("useBoardConsumer used outside a BoardContext.")
    }

    return context
}
