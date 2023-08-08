import {useServerTranslation} from "@/app/(i18n)/server"
import {KnownBoardsPanel} from "@/app/[lang]/(page)/KnownBoardsPanel"
import {StarredBoardsPanel} from "@/app/[lang]/(page)/StarredBoardsPanel"
import {default as React} from "react"


export async function ExistingBoardChapter({lng}: {lng: string}) {
	const {t} = await useServerTranslation(lng, "root")

	return (
		<div className={"chapter-2"}>
			<h2>
				{t("existingBoardTitle")}
			</h2>
			<KnownBoardsPanel lng={lng}/>
			<StarredBoardsPanel lng={lng}/>
		</div>
	)
}
