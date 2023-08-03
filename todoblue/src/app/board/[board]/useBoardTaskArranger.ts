"use client";

import {Task, TaskWithId} from "@/app/board/[board]/types"
import {useMemo} from "react"

export type TaskGroup = {
	key: string,
	tasks: TaskWithId[],
}

export type TaskGroupingFunction = (a: TaskWithId) => string
export type TaskSortingFunction = (a: TaskWithId, b: TaskWithId) => number;
export type GroupSortingFunction = (a: TaskGroup, b: TaskGroup) => number;

export function arrangeBoardTasks(tasksById: { [p: string]: Task }, taskGrouper: TaskGroupingFunction, groupSorter: GroupSortingFunction, taskSorter: TaskSortingFunction): TaskGroup[] {
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
		groups.push({key, tasks})
	}

	groups.sort(groupSorter)

	return groups;
}


export function useBoardTaskArranger(tasksById: { [p: string]: Task }, taskGrouper: TaskGroupingFunction, groupSorter: GroupSortingFunction, taskSorter: TaskSortingFunction) {
	const taskGroups = useMemo(() => arrangeBoardTasks(tasksById, taskGrouper, groupSorter, taskSorter), [tasksById, taskGrouper, taskSorter, groupSorter])

	return {taskGroups};
}
