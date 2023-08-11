import {BoardSignal, DeleteTaskBoardSignal, TaskBoardSignal, TitleBoardSignal, UpdateTaskBoardSignal} from "@/app/[lang]/board/[board]/(api)/(signal)"
import {BoardState} from "@/app/[lang]/board/[board]/(api)/(state)/BoardState"
import {DEFAULT_BOARD_STATE} from "@/app/[lang]/board/[board]/(api)/(state)/defaultBoardState"

/**
 * **Reducer** updating a {@link BoardState} with a single new {@link BoardSignal}.
 *
 * If `null` is passed as signal, the state is reset to the default.
 *
 * If an unknown signal is passed, the state is not altered.
 *
 * @param state The state to update.
 * @param action The action to perform on the state.
 */
export function boardReducer(state: BoardState, action: BoardSignal | null) {
	if(action === null) {
		console.debug("[boardReducer] Initializing state...");
		return DEFAULT_BOARD_STATE
	}
	else if("Title" in action) {
		const titleAction = action as TitleBoardSignal;
		const title = titleAction["Title"]
		console.debug("[boardReducer] Setting board title to:", title)
		return {...state, title}
	}
	else if("Task" in action) {
		const taskAction = action as TaskBoardSignal;
		const task = taskAction["Task"][1]
		const tasksById = {...state.tasksById}
		if(task === null) {
			const deleteAction = taskAction as DeleteTaskBoardSignal;
			const id = deleteAction["Task"][0]
			console.debug("[boardReducer] Deleting task:", id)
			delete tasksById[id]
		}
		else {
			const updateAction = taskAction as UpdateTaskBoardSignal;
			const id = updateAction["Task"][0] as string
			console.debug("[boardReducer] Putting task:", id)
			tasksById[id] = task
		}
		return {...state, tasksById}
	}
	else {
		console.warn("[boardReducer] Received unknown signal, ignoring:", action)
		return state
	}
}
