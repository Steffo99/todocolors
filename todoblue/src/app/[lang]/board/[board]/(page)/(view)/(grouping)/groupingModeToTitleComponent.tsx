import {useClientTranslation} from "@/app/(i18n)/client"
import {TASK_ICON_TO_FONTAWESOME_REGULAR, TaskIcon, TaskImportance, TaskPriority, TaskStatus} from "@/app/[lang]/board/[board]/(api)/(task)"
import {GroupingMode} from "@/app/[lang]/board/[board]/(page)/(view)/(grouping)/GroupingMode"
import taskImportanceStyle from "@/app/[lang]/board/[board]/(page)/(view)/(task)/taskImportance.module.css"
import taskPriorityStyle from "@/app/[lang]/board/[board]/(page)/(view)/(task)/taskPriority.module.css"
import taskStatusStyle from "@/app/[lang]/board/[board]/(page)/(view)/(task)/taskStatus.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {ReactNode} from "react"


export interface TitleComponentProps {
	lang: string,
	k: any,
}


export const GROUPING_MODE_TO_TITLE_COMPONENT: {[key in GroupingMode]: (t: TitleComponentProps) => ReactNode} = {
	[GroupingMode.ByImportance]: function TitleFromImportance({lang, k}: { lang: string, k: TaskImportance }): ReactNode {
		const {t} = useClientTranslation(lang, "board")

		switch(k) {
			case TaskImportance.Highest:
				return (
					<span className={taskImportanceStyle.taskImportanceHighest}>
						{t("columnHeaderTaskImportanceHighest")}
					</span>
                )
			case TaskImportance.High:
				return (
					<span className={taskImportanceStyle.taskImportanceHigh}>
                        {t("columnHeaderTaskImportanceHigh")}
					</span>
                )
			case TaskImportance.Normal:
				return (
					<span className={taskImportanceStyle.taskImportanceNormal}>
                        {t("columnHeaderTaskImportanceNormal")}
					</span>
                )
			case TaskImportance.Low:
				return (
					<span className={taskImportanceStyle.taskImportanceLow}>
                        {t("columnHeaderTaskImportanceLow")}
					</span>
                )
			case TaskImportance.Lowest:
				return (
					<span className={taskImportanceStyle.taskImportanceLowest}>
                        {t("columnHeaderTaskImportanceLowest")}
					</span>
                )
		}
	},

	[GroupingMode.ByPriority]: function TitleFromPriority({lang, k}: { lang: string, k: TaskPriority }): ReactNode {
		const {t} = useClientTranslation(lang, "board")

		switch(k) {
			case TaskPriority.Highest:
				return (
					<span className={taskPriorityStyle.taskPriorityHighestColumnHeader}>
						{t("columnHeaderTaskPriorityHighest")}
					</span>
                )
			case TaskPriority.High:
				return (
					<span className={taskPriorityStyle.taskPriorityHighColumnHeader}>
						{t("columnHeaderTaskPriorityHigh")}
					</span>
                )
			case TaskPriority.Normal:
				return (
					<span className={taskPriorityStyle.taskPriorityNormalColumnHeader}>
						{t("columnHeaderTaskPriorityNormal")}
					</span>
                )
			case TaskPriority.Low:
				return (
					<span className={taskPriorityStyle.taskPriorityLowColumnHeader}>
						{t("columnHeaderTaskPriorityLow")}
					</span>
                )
			case TaskPriority.Lowest:
				return (
					<span className={taskPriorityStyle.taskPriorityLowestColumnHeader}>
						{t("columnHeaderTaskPriorityLowest")}
					</span>
                )
		}
	},

	[GroupingMode.ByStatus]: function TitleFromStatus({lang, k}: { lang: string, k: TaskStatus }): ReactNode {
		const {t} = useClientTranslation(lang, "board")

        switch(k) {
            case TaskStatus.Unfinished:
                return (
                    <span className={taskStatusStyle.taskStatusUnfinishedColumnHeader}>
						{t("columnHeaderTaskStatusUnfinished")}
					</span>
                )
            case TaskStatus.InProgress:
                return (
                    <span className={taskStatusStyle.taskStatusInProgressColumnHeader}>
						{t("columnHeaderTaskStatusInProgress")}
					</span>
                )
            case TaskStatus.Complete:
                return (
                    <span className={taskStatusStyle.taskStatusCompleteColumnHeader}>
						{t("columnHeaderTaskStatusComplete")}
					</span>
                )
        }
	},

	[GroupingMode.ByIcon]: function TitleFromIcon({k}: { lang: string, k: TaskIcon }): ReactNode {
		return (
			<span>
				<FontAwesomeIcon icon={TASK_ICON_TO_FONTAWESOME_REGULAR[k]}/>
				&nbsp;
				{TaskIcon[k]}
			</span>
		)
	},
}
