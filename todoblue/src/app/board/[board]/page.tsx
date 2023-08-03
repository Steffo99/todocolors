"use client";

import {BoardBody} from "@/app/board/[board]/BoardBody"
import {BoardManager} from "@/app/board/[board]/BoardManager"
import {BoardHeader} from "@/app/board/[board]/BoardHeader"


export default function Page({params: {board}}: {params: {board: string}}) {
	return (
		<BoardManager name={board}>
			<BoardHeader/>
			<BoardBody/>
		</BoardManager>
	)
}
