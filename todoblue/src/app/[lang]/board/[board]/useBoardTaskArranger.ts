"use client";

import {Task, TaskWithId} from "@/app/[lang]/board/[board]/Types"
import {ReactNode, useMemo} from "react"

export type TaskGroup = {
	key: string,
	name: ReactNode,
	tasks: TaskWithId[],
}

export type TaskCategorizer = (a: TaskWithId) => string
export type TaskGroupComparer = (a: TaskGroup, b: TaskGroup) => number;
export type TaskGroupTitleComponent = (a: {key: string}) => ReactNode;
export type TaskSortingFunction = (a: TaskWithId, b: TaskWithId) => number;

export function arrangeBoardTasks(tasksById: { [p: string]: Task }, taskGrouper: TaskCategorizer, groupSorter: TaskGroupComparer, groupNamer: TaskGroupTitleComponent, taskSorter: TaskSortingFunction): TaskGroup[] {
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
		const name = groupNamer({key});
		groups.push({key, name, tasks})
	}

	groups.sort(groupSorter)

	return groups;
}


export function useBoardTaskArranger(tasksById: { [p: string]: Task }, taskGrouper: TaskCategorizer, groupSorter: TaskGroupComparer, groupNamer: TaskGroupTitleComponent, taskSorter: TaskSortingFunction) {
	const taskGroups = useMemo(() => arrangeBoardTasks(tasksById, taskGrouper, groupSorter, groupNamer, taskSorter), [tasksById, taskGrouper, taskSorter, groupSorter])

	return {taskGroups};
}
