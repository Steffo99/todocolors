"use client";
import {useBoardWs} from "@/app/[lang]/board/[board]/(api)/(ws)/useBoardWs"
import {BoardContext} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)/BoardContext"
import {ReactNode} from "react"


export function BoardProvider({children, name}: {children: ReactNode, name: string}) {
    const value = useBoardWs(name)

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    )
}
