import {Task} from "@/app/[lang]/board/[board]/(api)/(task)"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"
import {GROUPING_MODE_TO_GROUP_SORTER_FUNCTION, GROUPING_MODE_TO_TASK_GROUPER_FUNCTION, GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)"
import {TaskGroup} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/TaskGroup"
import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)"
import {getTaskSorter} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)/sortingModeToSortingFunction"
import {useMemo} from "react"


export function useBoardTasksArranger(tasks: {[id: string]: Task}, grouping: GroupingMode, sorting: SortingMode[]) {
    const taskGroups = useMemo(() => {
        const taskGrouperFunction = GROUPING_MODE_TO_TASK_GROUPER_FUNCTION[grouping]
        const keyedTaskGroups: {[t: string | number]: TaskWithId[]} = {}

        Object.entries(tasks).forEach((t: TaskWithId) => {
            const group = taskGrouperFunction(t)
            if(group === null) return;
            const array = keyedTaskGroups[group] ?? []
            keyedTaskGroups[group] = [...array, t]
        })

        const taskSorterFunction = getTaskSorter(sorting)
        Object.values(keyedTaskGroups).forEach((ta: TaskWithId[]) => {
            ta.sort(taskSorterFunction)
        })

        const groupSorterFunction = GROUPING_MODE_TO_GROUP_SORTER_FUNCTION[grouping]
        // FIXME: The typing of this function is completely messed up.
        const taskGroups: any = Object.entries(keyedTaskGroups).map(([k, tasks]) => ({k, tasks}))
        taskGroups.sort(groupSorterFunction)
        return taskGroups as TaskGroup<string | number>[]

    }, [tasks, grouping, sorting])

    return {
        taskGroups,
    }
}
