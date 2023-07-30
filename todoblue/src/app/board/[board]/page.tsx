'use client';
import {default as React} from "react";
import {useBoard} from "@/app/board/[board]/useBoard"


export default function Page({params: {board}}: {params: {board: string}}) {
	const wsUrl = React.useMemo(() => `ws://127.0.0.1:8080/board/${board}/ws`, [board])
	useBoard(wsUrl);

	return (
		<p>
			TODO
		</p>
	)
}
