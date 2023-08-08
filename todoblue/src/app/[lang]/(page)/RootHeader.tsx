import {useTranslation} from "@/app/(i18n)/server"
import style from "./RootHeader.module.css"
import {default as React} from "react"


export async function RootHeader({lng}: {lng: string}) {
	const {t} = await useTranslation(lng, "root")

	return (
		<header className={style.pageHeader}>
			<img className={style.pageLogo} src={"/logo-nbg-160.png"} width={64} height={64} alt={""}/>
			<h1 className={style.pageTitle}>
				{t("title")}
			</h1>
		</header>
	)
}