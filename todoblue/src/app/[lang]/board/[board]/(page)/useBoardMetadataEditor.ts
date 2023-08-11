import {TitleBoardRequest} from "@/app/[lang]/board/[board]/(api)/(request)"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {useCallback, useState} from "react"


export function useBoardMetadataEditor() {
	const {sendRequest, boardState: {title: titleFromState}} = useBoardConsumer()
	const [isEditingMetadata, setEditingMetadata] = useState<boolean>(false)
	const [titleFromEditor, setTitleFromEditor] = useState<string>(titleFromState)

	const startEditingMetadata = useCallback(() => {
		console.debug("[useEditableTitle] Starting title edit...");
		setEditingMetadata(true);
		setTitleFromEditor(titleFromState);
	}, [titleFromState])

	const stopEditingMetadata = useCallback(() => {
		console.debug("[useEditableTitle] Ending title edit...");
		setEditingMetadata(false);
		if(titleFromEditor.length > 0) {
			console.debug("[useEditableTitle] Sending title change request...");
			const request: TitleBoardRequest = {"Title": titleFromEditor}
			sendRequest(request)
		}
	}, [sendRequest, titleFromEditor])

	const toggleEditingMetadata = useCallback(() => {
		return isEditingMetadata ? stopEditingMetadata() : startEditingMetadata()
	}, [isEditingMetadata, stopEditingMetadata, startEditingMetadata])

	return {isEditingMetadata, startEditingMetadata, stopEditingMetadata, toggleEditingMetadata, titleFromEditor, setTitleFromEditor}
}
