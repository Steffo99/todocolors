import {BoardHeaderTitle} from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderTitle"
import {ConnectedClientsButton} from "@/app/[lang]/board/[board]/(page)/(header)/ConnectedClientsButton"
import {CycleColumningButton} from "@/app/[lang]/board/[board]/(page)/(header)/CycleColumningButton"
import {CycleGroupingButton} from "@/app/[lang]/board/[board]/(page)/(header)/CycleGroupingButton"
import {CycleSortingButton} from "@/app/[lang]/board/[board]/(page)/(header)/CycleSortingButton"
import {NavigateHomeButton} from "@/app/[lang]/board/[board]/(page)/(header)/NavigateHomeButton"
import {ToggleEditingButton} from "@/app/[lang]/board/[board]/(page)/(header)/ToggleEditingButton"
import {ToggleLockedButton} from "@/app/[lang]/board/[board]/(page)/(header)/ToggleLockedButton"
import {ToggleStarredButton} from "@/app/[lang]/board/[board]/(page)/(header)/ToggleStarredButton"
import {TrimButton} from "@/app/[lang]/board/[board]/(page)/(header)/TrimButton"
import {useBoardLayoutEditor} from "@/app/[lang]/board/[board]/(page)/useBoardLayoutEditor"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import cn from "classnames"
import {TFunction} from "i18next"
import style from "./BoardHeader.module.css"


interface BoardHeaderProps {
	t: TFunction,
	className?: string,
	metadataHook: ReturnType<typeof useBoardMetadataEditor>,
	layoutHook: ReturnType<typeof useBoardLayoutEditor>,
}


export function BoardHeader({t, className, metadataHook, layoutHook: {columningHook, groupingHook, sortingHook}}: BoardHeaderProps) {
	return (
		<header className={cn(style.boardHeader, className)}>
			<div className={cn(style.buttonsArea, style.leftButtonsArea)}>
				<NavigateHomeButton
					t={t}
				/>
				<ToggleStarredButton
					t={t}
				/>
				<ToggleLockedButton
					t={t}
				/>
				<ConnectedClientsButton
					t={t}
				/>
			</div>
			<BoardHeaderTitle
				t={t}
				className={style.titleArea}
				editorHook={metadataHook}
			/>
			<div className={cn(style.buttonsArea, style.rightButtonsArea)}>
				<TrimButton
					t={t}
				/>
				<ToggleEditingButton
					t={t}
					metadataHook={metadataHook}
				/>
				<CycleColumningButton
					t={t}
					value={columningHook.value} next={columningHook.next}
				/>
				<CycleGroupingButton
					t={t}
					next={groupingHook.next}
				/>
				<CycleSortingButton
					t={t}
					next={sortingHook.next}
				/>
			</div>
		</header>
	)
}
