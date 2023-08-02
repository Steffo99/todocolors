import {Task} from "@/app/board/[board]/types"


export function groupAndSortTasks(tasks: Task[], grouping: (a: Task) => string, sorting: (a: Task, b: Task) => number) {
	const groups: {[group: string]: Task[]} = {}

	for(const task of tasks) {
		const group = grouping(task);
		if(!groups[group]) {
			groups[group] = [];
		}
		groups[group].push(task);
	}

	for(const group of Object.keys(groups)) {
		groups[group].sort(sorting);
	}

	return groups;
}
