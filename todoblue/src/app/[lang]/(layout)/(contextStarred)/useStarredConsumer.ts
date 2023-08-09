"use client";

import {StarredContext} from "@/app/[lang]/(layout)/(contextStarred)/StarredContext"
import {StarredContextData} from "@/app/[lang]/(layout)/(contextStarred)/StarredContextData"
import {useContext} from "react"


export function useStarredConsumer(): StarredContextData {
	const context = useContext(StarredContext)

	if(context === null) {
		throw new Error("useStarredConsumer used outside a StarredContext.")
	}

	return context
}
