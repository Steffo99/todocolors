import {Dispatch, SetStateAction} from "react"


export type ReturnTypeOfUseState<S> = [
	S,
	Dispatch<SetStateAction<S>>,
]

