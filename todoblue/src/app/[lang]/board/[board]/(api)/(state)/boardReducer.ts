import {ConnectBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/ConnectBoardChange"
import {DisconnectBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/DisconnectBoardChange"
import {StateBoardChange} from "@/app/[lang]/board/[board]/(api)/(change)/StateBoardChange"
import {BoardState} from "@/app/[lang]/board/[board]/(api)/(state)/BoardState"
import {DEFAULT_BOARD_STATE} from "@/app/[lang]/board/[board]/(api)/(state)/defaultBoardState"
import {BoardChange, DeleteTaskBoardChange, LockBoardChange, TaskBoardChange, TitleBoardChange, UpdateTaskBoardChange} from "../(change)"


/**
 * **Reducer** updating a {@link BoardState} with a single new {@link BoardChange}.
 *
 * If `null` is passed as change, the state is reset to the default.
 *
 * If an unknown signal is passed, the state is not altered.
 *
 * @param state The state to update.
 * @param change The action to perform on the state.
 */
export function boardReducer(state: BoardState, change: BoardChange | null) {
	if(change === null) {
		console.debug("[boardReducer] Initializing state...");
		return DEFAULT_BOARD_STATE
	}
	else if("Title" in change) {
		const titleChange = change as TitleBoardChange;
		const title = titleChange["Title"]
		console.debug("[boardReducer] Setting board title to:", title)
		return {...state, title}
	}
	else if("Task" in change) {
		const taskChange = change as TaskBoardChange;
		const task = taskChange["Task"][1]
		const tasks = {...state.tasks}
		if(task === null) {
			const deleteChange = taskChange as DeleteTaskBoardChange;
			const id = deleteChange["Task"][0]
			console.debug("[boardReducer] Deleting task:", id)
			delete tasks[id]
		}
		else {
			const updateChange = taskChange as UpdateTaskBoardChange;
			const id = updateChange["Task"][0] as string
			console.debug("[boardReducer] Putting task:", id)
			tasks[id] = task
		}
		return {...state, tasks}
	}
	else if("Connect" in change) {
		const connectChange = change as ConnectBoardChange;
		const id = connectChange["Connect"];
		const connectedClients = [...state.clients, id]
		console.debug("[boardReducer] Adding new client:", id)
		return {...state, connectedClients}
	}
	else if("Disconnect" in change) {
		const disconnectChange = change as DisconnectBoardChange;
		const id = disconnectChange["Disconnect"];
		const connectedClients = [...state.clients]
		const clientIndex = connectedClients.indexOf(id)
		if(clientIndex !== -1) {
			connectedClients.splice(clientIndex, 1);
			console.debug("[boardReducer] Removing client:", id)
			return {...state, connectedClients}
		}
		else {
			console.warn("[boardReducer] Received DisconnectBoardChange without the client being connected in first place.")
			return state
		}
	}
	if("Lock" in change) {
		const lockChange = change as LockBoardChange;
		const locked = lockChange["Lock"]
		console.debug("[boardReducer] Setting locked status to:", locked)
		return {...state, locked}
	}
	if("State" in change) {
		const stateChange = change as StateBoardChange;
		// noinspection UnnecessaryLocalVariableJS
		const state = stateChange["State"]
		return {...state}
	}
	else {
		console.warn("[boardReducer] Received unknown signal, ignoring:", change)
		return state
	}
}
