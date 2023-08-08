import {useTranslation} from "@/app/(i18n)/server"
import style from "@/app/[lang]/page.module.css"
import {default as React} from "react"


export async function RootHeader({lng}: {lng: string}) {
	const {t} = await useTranslation(lng, "root")

	return (
		<header className={style.pageHeader}>
			<h1>
				{t("title")}
			</h1>
		</header>
	)
}
