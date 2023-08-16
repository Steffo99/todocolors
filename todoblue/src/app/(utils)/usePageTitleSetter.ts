import {useEffect} from "react"


export function usePageTitleSetter(title: string) {
	useEffect(() => {
		document.title = title
	}, [title])
}
