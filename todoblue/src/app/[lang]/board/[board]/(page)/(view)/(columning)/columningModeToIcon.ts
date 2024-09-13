import {ColumningMode} from "@/app/[lang]/board/[board]/(page)/(view)/(columning)/ColumningMode"
import {fas} from "@awesome.me/kit-dfe340c874/icons"
import {IconDefinition} from "@fortawesome/fontawesome-svg-core"


export const COLUMNING_MODE_TO_ICON: {[m in ColumningMode]: IconDefinition}  = {
	[ColumningMode.SingleColumn]: fas.faTableList,
	[ColumningMode.MultiColumn]: fas.faTableColumns,
}
