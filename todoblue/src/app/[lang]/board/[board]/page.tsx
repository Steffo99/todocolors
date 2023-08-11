import {TaskEditor} from "@/app/[lang]/board/[board]/(page)/(edit)/TaskEditor"
import {BoardPage} from "@/app/[lang]/board/[board]/(page)/BoardPage"
import {useBoardLayoutEditor} from "@/app/[lang]/board/[board]/(page)/useBoardLayoutEditor"
import {useBoardMetadataEditor} from "@/app/[lang]/board/[board]/(page)/useBoardMetadataEditor"
import {BoardMain} from "@/app/[lang]/board/[board]/(page)/(view)/BoardMain"
import {BoardHeader} from "@/app/[lang]/board/[board]/(page)/(header)/BoardHeader"
import {useTaskEditor} from "@/app/[lang]/board/[board]/(page)/useTaskEditor"
import {Metadata} from "next"
import style from "./page.module.css"


export default function page({params: {lang}}: {params: {lang: string}}) {
	return (
		<BoardPage lang={lang}/>
	)
}
