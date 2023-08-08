"use client";

import {StarredContextData} from "@/app/[lang]/(layout)/(contextStarred)/StarredContextData"
import {createContext} from "react"


export const StarredContext = createContext<StarredContextData | null>(null)
