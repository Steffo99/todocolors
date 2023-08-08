import {useServerTranslation} from "@/app/(i18n)/server"
import {CreatePrivateBoardPanel} from "@/app/[lang]/(page)/CreatePrivateBoardPanel"
import {CreatePublicBoardPanel} from "@/app/[lang]/(page)/CreatePublicBoardPanel"
import {default as React} from "react"


export async function CreateBoardChapter({lng}: {lng: string}) {
	const {t} = await useServerTranslation(lng, "root")

	return (
		<div className={"chapter-2"}>
			<h2>
				{t("createBoardTitle")}
			</h2>
			<CreatePublicBoardPanel lng={lng}/>
			<CreatePrivateBoardPanel lng={lng}/>
		</div>
	)
}
