import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)/SortingMode"
import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(view)/(task)/TaskWithId"


export function getTaskSorter(sortingModes: SortingMode[]) {
    return (a: TaskWithId, b: TaskWithId) => {
        for(const sortingMode of sortingModes) {
            const result = SORTING_MODE_TO_SORTING_FUNCTION[sortingMode](a, b)
            if(result !== 0) {
                return result
            }
        }
        return 0
    }
}

const SORTING_MODE_TO_SORTING_FUNCTION = {
    [SortingMode.ByText]: function sortTasksByText(a: TaskWithId, b: TaskWithId) {
        return a[1].text.localeCompare(b[1].text)
    },
    [SortingMode.ByIcon]: function sortTasksByIcon(a: TaskWithId, b: TaskWithId) {
        return a[1].icon - b[1].icon
    },
    [SortingMode.ByImportance]: function sortTasksByImportance(a: TaskWithId, b: TaskWithId) {
        return a[1].importance - b[1].importance
    },
    [SortingMode.ByPriority]: function sortTasksByPriority(a: TaskWithId, b: TaskWithId) {
        return a[1].priority - b[1].priority
    },
    [SortingMode.ByStatus]: function sortTasksByStatus(a: TaskWithId, b: TaskWithId) {
        return a[1].status - b[1].status
    }
}
