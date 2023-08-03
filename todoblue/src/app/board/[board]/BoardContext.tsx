import {UseBoardReturns} from "@/app/board/[board]/useBoard"
import {createContext, useContext} from "react"

export const BoardContext = createContext<UseBoardReturns | null>(null);
