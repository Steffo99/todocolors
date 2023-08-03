"use client";

import {Task, TaskWithId} from "@/app/board/[board]/types"
import {ReactNode, useMemo} from "react"

export type TaskGroup = {
	key: string,
	name: ReactNode,
	tasks: TaskWithId[],
}

export type TaskGroupingFunction = (a: TaskWithId) => string
export type GroupSortingFunction = (a: TaskGroup, b: TaskGroup) => number;
export type GroupNamingFunction = (a: string) => ReactNode;
export type TaskSortingFunction = (a: TaskWithId, b: TaskWithId) => number;

export function arrangeBoardTasks(tasksById: { [p: string]: Task }, taskGrouper: TaskGroupingFunction, groupSorter: GroupSortingFunction, groupNamer: GroupNamingFunction, taskSorter: TaskSortingFunction): TaskGroup[] {
	const groupsByKey: {[group: string]: TaskWithId[]} = {}

	for(const [id, task] of Object.entries(tasksById)) {
		const taskWithId = {...task, id};
		const group = taskGrouper(taskWithId);
		if(!groupsByKey[group]) {
			groupsByKey[group] = [];
		}
		groupsByKey[group].push(taskWithId);
	}

	for(const group of Object.keys(groupsByKey)) {
		groupsByKey[group].sort(taskSorter);
	}

	const groups: TaskGroup[] = []

	for(const [key, tasks] of Object.entries(groupsByKey)) {
		const name = groupNamer(key);
		groups.push({key, name, tasks})
	}

	groups.sort(groupSorter)

	return groups;
}


export function useBoardTaskArranger(tasksById: { [p: string]: Task }, taskGrouper: TaskGroupingFunction, groupSorter: GroupSortingFunction, groupNamer: GroupNamingFunction, taskSorter: TaskSortingFunction) {
	const taskGroups = useMemo(() => arrangeBoardTasks(tasksById, taskGrouper, groupSorter, groupNamer, taskSorter), [tasksById, taskGrouper, taskSorter, groupSorter])

	return {taskGroups};
}
