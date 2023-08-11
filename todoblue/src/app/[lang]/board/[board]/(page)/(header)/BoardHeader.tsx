import {BoardHeaderTitle} from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeaderTitle"
import {CycleColumningButton} from "@/app/[lang]/board/[board]/(page)/(header)/CycleColumningButton"
import {CycleGroupingButton} from "@/app/[lang]/board/[board]/(page)/(header)/CycleGroupingButton"
import {CycleSortingButton} from "@/app/[lang]/board/[board]/(page)/(header)/CycleSortingButton"
import {NavigateHomeButton} from "@/app/[lang]/board/[board]/(page)/(header)/NavigateHomeButton"
import {ToggleEditingButton} from "@/app/[lang]/board/[board]/(page)/(header)/ToggleEditingButton"
import {ToggleStarredButton} from "@/app/[lang]/board/[board]/(page)/(header)/ToggleStarredButton"
import {useBoardLayoutEditor} from "@/app/[lang]/board/[board]/(page)/useBoardLayoutEditor"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import style from "./BoardHeader.module.css"
import cn from "classnames"


interface BoardHeaderProps {
	lang: string,
	className?: string,
	metadataHook: ReturnType<typeof useBoardMetadataEditor>,
	layoutHook: ReturnType<typeof useBoardLayoutEditor>,
}


export function BoardHeader({lang, className, metadataHook, layoutHook: {columningHook, groupingHook, sortingHook}}: BoardHeaderProps) {
	return (
		<header className={cn(style.boardHeader, className)}>
			<div className={cn(style.buttonsArea, style.leftButtonsArea)}>
				<NavigateHomeButton lang={lang}/>
				<ToggleStarredButton lang={lang}/>
				<ToggleEditingButton lang={lang} metadataHook={metadataHook}/>
			</div>
			<BoardHeaderTitle className={style.titleArea} editorHook={metadataHook}/>
			<div className={cn(style.buttonsArea, style.rightButtonsArea)}>
				<CycleColumningButton lang={lang} value={columningHook.value} next={columningHook.next}/>
				<CycleGroupingButton lang={lang} next={groupingHook.next}/>
				<CycleSortingButton lang={lang} next={sortingHook.next}/>
			</div>
		</header>
	)
}
