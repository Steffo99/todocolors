import {useServerTranslation} from "@/app/(i18n)/server"
import {default as React} from "react"
import style from "./RootHeader.module.css"


export async function RootHeader({lang}: {lang: string}) {
	const {t} = await useServerTranslation(lang, "root")

	return (
		<header className={style.pageHeader}>
			<img className={style.pageLogo} src={"/logo-nbg-160.png"} width={64} height={64} alt={""}/>
			<h1 className={style.pageTitle}>
				{t("title")}
			</h1>
		</header>
	)
}
