import {RootFooter} from "@/app/[lang]/(page)/RootFooter"
import {RootHeader} from "@/app/[lang]/(page)/RootHeader"
import {RootMain} from "@/app/[lang]/(page)/RootMain"
import {default as React} from "react";
import style from "./page.module.css"


export default async function page({params: {lng}}: {params: {lng: string}}) {
	return (
		<div className={style.pageRoot}>
			<RootHeader lng={lng}/>
			<RootMain lng={lng}/>
			<RootFooter lng={lng}/>
		</div>
	)
}

