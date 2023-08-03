"use client";

import {BoardAction, Task, TaskBoardAction, TitleBoardAction} from "@/app/board/[board]/Types"
import {Reducer, useReducer} from "react"


type BoardState = {
    title: string,
    tasksById: {[key: string]: Task},
}

function boardReducer(state: BoardState, action: BoardAction | null) {
    if(action === null) {
        console.debug("[boardReducer] Initializing state...");
        return {title: "", tasksById: {}}
    }
    else if(Object.hasOwn(action, "Title")) {
        const titleAction = action as TitleBoardAction;
        const title = titleAction["Title"]
        console.debug("[boardReducer] Setting board title to:", title)
        return {...state, title}
    }
    else if(Object.hasOwn(action, "Task")) {
        const taskAction = action as TaskBoardAction;
        const id = taskAction["Task"][0]
        const task = taskAction["Task"][1]
        const tasksById = {...state.tasksById}
        if(task === null) {
            console.debug("[boardReducer] Deleting task:", id)
            delete tasksById[id]
        }
        else {
            console.debug("[boardReducer] Putting task:", id)
            tasksById[id] = task
        }
        return {...state, tasksById}
    }
    else {
        console.warn("[boardReducer] Received unknown action, ignoring:", action)
        return state
    }
}

export function useBoardState() {
    const [state, act] = useReducer<Reducer<BoardState, BoardAction | null>>(boardReducer, {title: "", tasksById: {}})

    return {state, act}
}
