"use client";

import {BoardMain} from "@/app/[lang]/board/[board]/BoardMain"
import {BoardManager} from "@/app/[lang]/board/[board]/BoardManager"
import {BoardHeader} from "@/app/[lang]/board/[board]/BoardHeader"
import {BoardTaskEditor} from "@/app/[lang]/board/[board]/BoardTaskEditor"
import style from "./page.module.css"

export default function Page({params: {board}}: {params: {board: string}}) {
	return (
		<BoardManager name={board}>
			<div className={style.pageRoot}>
				<BoardHeader className={style.pageHeader}/>
				<BoardMain className={style.pageMain}/>
				<BoardTaskEditor className={style.pageEditor}/>
			</div>
		</BoardManager>
	)
}
