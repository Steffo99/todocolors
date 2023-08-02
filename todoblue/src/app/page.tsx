import {CreatePrivateBoard} from "@/app/CreatePrivateBoard"
import {CreatePublicBoard} from "@/app/CreatePublicBoard"
import {default as React} from "react";

export default function Page() {
	return <>
		<header>
			<h1>
				{process.env.NEXT_PUBLIC_SITE_NAME ?? "Todoblue"}
			</h1>
		</header>
		<main>
			<div className={"chapter-2"}>
				<h2>
					Crea un nuovo tabellone
				</h2>
				<CreatePublicBoard/>
				<CreatePrivateBoard/>
			</div>
		</main>
	</>
}
