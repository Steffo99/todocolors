import {RootFooter} from "@/app/RootFooter"
import {RootHeader} from "@/app/RootHeader"
import {RootMain} from "@/app/RootMain"
import {default as React} from "react";
import style from "./page.module.css"


export default function page() {
	return (
		<div className={style.pageRoot}>
			<RootHeader/>
			<RootMain/>
			<RootFooter/>
		</div>
	)
}

