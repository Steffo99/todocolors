import {useServerTranslation} from "@/app/(i18n)/server"
import {CreatePrivateBoardPanel} from "@/app/[lang]/(page)/CreatePrivateBoardPanel"
import {CreatePublicBoardPanel} from "@/app/[lang]/(page)/CreatePublicBoardPanel"
import {default as React} from "react"


export async function CreateBoardChapter({lang}: {lang: string}) {
	const {t} = await useServerTranslation(lang, "root")

	return (
		<div className={"chapter-2"}>
			<h2>
				{t("createBoardTitle")}
			</h2>
			<CreatePublicBoardPanel lang={lang}/>
			<CreatePrivateBoardPanel lang={lang}/>
		</div>
	)
}
