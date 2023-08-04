import {CreatePrivateBoardPanel} from "@/app/CreatePrivateBoardPanel"
import {CreatePublicBoardPanel} from "@/app/CreatePublicBoardPanel"
import {SiteName} from "@/app/SiteName"
import {default as React} from "react";
import style from "./page.module.css"


export default function Page() {
	return <div className={style.pageRoot}>
		<PageHeader/>
		<PageMain/>
		<PageFooter/>
	</div>
}

function PageHeader() {
	return (
		<header className={style.pageHeader}>
			<h1>
				<SiteName/>
			</h1>
		</header>
	)
}

function PageMain() {
	return (
		<main className={style.pageMain}>
			<div className={"chapter-2"}>
				<h2>
					Crea un nuovo tabellone
				</h2>
				<CreatePublicBoardPanel/>
				<CreatePrivateBoardPanel/>
			</div>
		</main>
	)
}

function PageFooter() {
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
