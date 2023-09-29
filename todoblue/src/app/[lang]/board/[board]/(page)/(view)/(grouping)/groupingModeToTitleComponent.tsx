import {TASK_ICON_TO_FONTAWESOME_REGULAR, TaskIcon, TaskImportance, TaskPriority} from "@/app/[lang]/board/[board]/(api)/(task)"
import style from "@/app/[lang]/board/[board]/(page)/(task)/TaskContainer.module.css"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/GroupingMode"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {TFunction} from "i18next"
import {ReactNode} from "react"


export interface TitleComponentProps {
	t: TFunction,
	k: any,
}


export const GROUPING_MODE_TO_TITLE_COMPONENT: {[key in GroupingMode]: (t: TitleComponentProps) => ReactNode} = {
	[GroupingMode.ByImportance]: function TitleFromImportance({t, k}: { t: TFunction, k: TaskImportance }): ReactNode {
		switch(k) {
			case TaskImportance.Highest:
				return (
					<span className={style.taskImportanceHighest}>
						{t("taskImportanceHighest")}
					</span>
                )
			case TaskImportance.High:
				return (
					<span className={style.taskImportanceHigh}>
                        {t("taskImportanceHigh")}
					</span>
                )
			case TaskImportance.Normal:
				return (
					<span className={style.taskImportanceNormal}>
                        {t("taskImportanceNormal")}
					</span>
                )
			case TaskImportance.Low:
				return (
					<span className={style.taskImportanceLow}>
                        {t("taskImportanceLow")}
					</span>
                )
			case TaskImportance.Lowest:
				return (
					<span className={style.taskImportanceLowest}>
                        {t("taskImportanceLowest")}
					</span>
                )
		}
	},

	[GroupingMode.ByPriority]: function TitleFromPriority({t, k}: { t: TFunction, k: TaskPriority }): ReactNode {
		switch(k) {
			case TaskPriority.Highest:
				return (
					<span className={style.taskPriorityHighestColumnHeader}>
						{t("taskPriorityHighest")}
					</span>
                )
			case TaskPriority.High:
				return (
					<span className={style.taskPriorityHighColumnHeader}>
						{t("taskPriorityHigh")}
					</span>
                )
			case TaskPriority.Normal:
				return (
					<span className={style.taskPriorityNormalColumnHeader}>
						{t("taskPriorityNormal")}
					</span>
                )
			case TaskPriority.Low:
				return (
					<span className={style.taskPriorityLowColumnHeader}>
						{t("taskPriorityLow")}
					</span>
                )
			case TaskPriority.Lowest:
				return (
					<span className={style.taskPriorityLowestColumnHeader}>
						{t("taskPriorityLowest")}
					</span>
                )
		}
	},

	[GroupingMode.ByStatus]: function TitleFromStatus({t, k}: { t: TFunction, k: string }): ReactNode {
        switch(k) {
            case "Unfinished":
                return (
                    <span className={style.taskStatusUnfinishedColumnHeader}>
						{t("taskStatusUnfinished")}
					</span>
                )
            case "InProgress":
                return (
                    <span className={style.taskStatusInProgressColumnHeader}>
						{t("taskStatusInProgress")}
					</span>
                )
            case "Complete":
                return (
                    <span className={style.taskStatusCompleteColumnHeader}>
						{t("taskStatusComplete")}
					</span>
                )
        }
	},

	[GroupingMode.ByIcon]: function TitleFromIcon({k}: { t: TFunction, k: TaskIcon }): ReactNode {
		return (
			<span>
				<FontAwesomeIcon icon={TASK_ICON_TO_FONTAWESOME_REGULAR[k]}/>
				&nbsp;
				{TaskIcon[k]}
			</span>
		)
	},

	[GroupingMode.Journal]: function TitleFromDatetime({k}: { t: TFunction, k: string }): ReactNode {
		return (
			<time dateTime={k}>
				{k}
			</time>
		)
	}
}
