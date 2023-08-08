import {useTranslation} from "@/app/(i18n)/server"
import {CreatePrivateBoardPanel} from "@/app/[lang]/(page)/CreatePrivateBoardPanel"
import {CreatePublicBoardPanel} from "@/app/[lang]/(page)/CreatePublicBoardPanel"
import {KnownBoardsPanel} from "@/app/[lang]/(page)/KnownBoardsPanel"
import style from "@/app/[lang]/page.module.css"
import {StarredBoardsPanel} from "@/app/[lang]/(page)/StarredBoardsPanel"
import {default as React} from "react"


export async function RootMain({lng}: {lng: string}) {
	const {t} = await useTranslation(lng, "root")

	return (
		<main className={style.pageMain}>
			<div className={"chapter-2"}>
				<h2>
					{t("createBoardTitle")}
				</h2>
				<CreatePublicBoardPanel lng={lng}/>
				<CreatePrivateBoardPanel lng={lng}/>
			</div>
			<div className={"chapter-2"}>
				<h2>
					{t("existingBoardTitle")}
				</h2>
				<KnownBoardsPanel lng={lng}/>
				<StarredBoardsPanel lng={lng}/>
			</div>
		</main>
	)
}
