"use client";

import {BoardMain} from "@/app/board/[board]/BoardMain"
import {BoardManager} from "@/app/board/[board]/BoardManager"
import {BoardHeader} from "@/app/board/[board]/BoardHeader"
import {BoardTaskEditForm} from "@/app/board/[board]/BoardTaskEditForm"


export default function Page({params: {board}}: {params: {board: string}}) {
	return (
		<BoardManager name={board}>
			<BoardHeader/>
			<BoardMain/>
			<BoardTaskEditForm/>
		</BoardManager>
	)
}
