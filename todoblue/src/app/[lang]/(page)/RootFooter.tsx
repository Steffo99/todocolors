import {useTranslation} from "@/app/(i18n)/server"
import style from "@/app/[lang]/page.module.css"
import {default as React} from "react"


export async function RootFooter({lng}: {lng: string}) {
	const {t} = await useTranslation(lng, "root")

	return (
		<footer className={style.pageFooter}>
			<p>
				© <a href="https://steffo.eu">Stefano Pigozzi</a> -
				<a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPL 3.0</a> -
				<a href="https://github.com/Steffo99/todocolors">GitHub</a>
			</p>
		</footer>
	)
}
