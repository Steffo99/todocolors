import {CreateBoardChapter} from "@/app/[lang]/(page)/CreateBoardChapter"
import {ExistingBoardChapter} from "@/app/[lang]/(page)/ExistingBoardChapter"
import {default as React} from "react"
import style from "./RootMain.module.css"


export async function RootMain({lang}: {lang: string}) {
	return (
		<main className={style.rootMain}>
			<ExistingBoardChapter lang={lang}/>
			<CreateBoardChapter lang={lang}/>
		</main>
	)
}
