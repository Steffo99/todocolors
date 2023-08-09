import {Dispatch, SetStateAction} from "react"


export interface StarredContextData {
	starred: string[],
	setStarred: Dispatch<SetStateAction<string[] | undefined>>
	addStarred: (key: string) => void,
	removeStarred: (key: string) => void,
	toggleStarred: (key: string) => boolean,
	isStarred: (key: string) => boolean,
}
