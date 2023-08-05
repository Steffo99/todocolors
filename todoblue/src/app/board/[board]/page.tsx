"use client";

import {BoardMain} from "@/app/board/[board]/BoardMain"
import {BoardManager} from "@/app/board/[board]/BoardManager"
import {BoardHeader} from "@/app/board/[board]/BoardHeader"
import {BoardTaskEditor} from "@/app/board/[board]/BoardTaskEditor"
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
