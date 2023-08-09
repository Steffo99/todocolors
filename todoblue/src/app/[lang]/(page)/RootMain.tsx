import {CreateBoardChapter} from "@/app/[lang]/(page)/CreateBoardChapter"
import {ExistingBoardChapter} from "@/app/[lang]/(page)/ExistingBoardChapter"
import style from "./RootMain.module.css"
import {default as React} from "react"


export async function RootMain({lang}: {lang: string}) {
	return (
		<main className={style.rootMain}>
			<CreateBoardChapter lang={lang}/>
			<ExistingBoardChapter lang={lang}/>
		</main>
	)
}
