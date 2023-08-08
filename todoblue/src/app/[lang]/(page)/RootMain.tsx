import {CreateBoardChapter} from "@/app/[lang]/(page)/CreateBoardChapter"
import {ExistingBoardChapter} from "@/app/[lang]/(page)/ExistingBoardChapter"
import style from "./RootMain.module.css"
import {default as React} from "react"


export async function RootMain({lng}: {lng: string}) {
	return (
		<main className={style.rootMain}>
			<CreateBoardChapter lng={lng}/>
			<ExistingBoardChapter lng={lng}/>
		</main>
	)
}
