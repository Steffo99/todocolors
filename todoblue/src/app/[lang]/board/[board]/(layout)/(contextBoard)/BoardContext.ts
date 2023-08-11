"use client";
import {useBoardWs} from "@/app/[lang]/board/[board]/(api)/(ws)/useBoardWs"
import {createContext} from "react"


export const BoardContext = createContext<ReturnType<typeof useBoardWs> | null>(null);
