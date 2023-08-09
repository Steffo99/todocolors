import {Dispatch, SetStateAction} from "react"


export interface StarredContextData {
	starred: string[],
	setStarred: Dispatch<SetStateAction<string[] | undefined>>
	addStarred: (key: string) => void,
	removeStarred: (key: string) => void,
	toggleStarred: (key: string) => void,
	isStarred: (key: string) => boolean,
}
