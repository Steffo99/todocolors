import {useCycler} from "@/app/(utils)/useCycler"
import {useBoardConsumer} from "@/app/[lang]/board/[board]/(layout)/(contextBoard)"
import {ColumningMode} from "@/app/[lang]/board/[board]/(page)/(view)/(columning)"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)"
import {SortingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(sorting)"
import {useMemo} from "react"
import useLocalStorage from "use-local-storage"


export function useBoardLayoutEditor() {
	const {boardName} = useBoardConsumer()

	const localStorageKeyColumning = useMemo(() => `TODOBLUE_${boardName}_LAYOUT`, [boardName])
	const localStorageKeyGrouping = useMemo(() => `TODOBLUE_${boardName}_GROUPING`, [boardName])
	const localStorageKeySorting = useMemo(() => `TODOBLUE_${boardName}_SORTING`, [boardName])

	const columningHook = useCycler(useLocalStorage<number | undefined>(localStorageKeyColumning, undefined), [
		ColumningMode.SingleColumn,
		ColumningMode.MultiColumn,
	])
	const groupingHook = useCycler(useLocalStorage<number | undefined>(localStorageKeyGrouping, undefined), [
		GroupingMode.ByPriority,
		GroupingMode.ByImportance,
		GroupingMode.ByStatus,
		GroupingMode.ByIcon,
	])
	const sortingHook = useCycler(useLocalStorage<number | undefined>(localStorageKeySorting, undefined), [
        [
			SortingMode.ByStatus,
            SortingMode.ByPriority,
            SortingMode.ByImportance,
            SortingMode.ByIcon,
            SortingMode.ByText,
        ],
        [
			SortingMode.ByStatus,
            SortingMode.ByImportance,
            SortingMode.ByPriority,
            SortingMode.ByIcon,
            SortingMode.ByText,
        ],
		[
			SortingMode.ByStatus,
			SortingMode.ByText,
		],
		[
			SortingMode.ByPriority,
			SortingMode.ByImportance,
			SortingMode.ByIcon,
			SortingMode.ByText,
		],
		[
			SortingMode.ByImportance,
			SortingMode.ByPriority,
			SortingMode.ByIcon,
			SortingMode.ByText,
		],
		[
			SortingMode.ByText,
		]
	])

	return {columningHook, groupingHook, sortingHook}
}
