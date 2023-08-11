import {ColumningMode} from "@/app/[lang]/board/[board]/(page)/(view)/(columning)/ColumningMode"
import {faTableColumns, faTableList} from "@fortawesome/free-solid-svg-icons"


export const COLUMNING_MODE_TO_ICON = {
	[ColumningMode.SingleColumn]: faTableList,
	[ColumningMode.MultiColumn]: faTableColumns,
}
