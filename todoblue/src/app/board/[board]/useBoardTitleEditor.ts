"use client";

import {BoardAction} from "@/app/board/[board]/types"
import {useCallback, useState} from "react"


export function useBoardTitleEditor(title: string, send: (action: BoardAction) => void) {
	const [isEditingTitle, setEditingTitle] = useState<boolean>(false)
	const [editTitle, setEditTitle] = useState<string>(title)

	const startEditingTitle = useCallback(() => {
		console.debug("[useEditableTitle] Starting title edit...");
		setEditingTitle(true);
		setEditTitle(title);
	}, [title])

	const stopEditingTitle = useCallback(() => {
		console.debug("[useEditableTitle] Ending title edit...");
		setEditingTitle(false);
		if(editTitle) {
			console.debug("[useEditableTitle] Sending title change event...");
			send({"Title": editTitle})
		}
	}, [send, editTitle])

	const toggleEditingTitle = useCallback(() => {
		return isEditingTitle ? stopEditingTitle() : startEditingTitle()
	}, [isEditingTitle, stopEditingTitle, startEditingTitle])

	return {isEditingTitle, startEditingTitle, stopEditingTitle, toggleEditingTitle, editTitle, setEditTitle}
}
