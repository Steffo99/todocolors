"use client";

import {useBoardCreator} from "@/app/useBoardCreator"
import {faKey} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {default as React} from "react"

export function CreatePrivateBoard() {
	const {createBoard} = useBoardCreator();

	return (
		<form
			className={"panel box form-flex"}
			onSubmit={e => {
				e.preventDefault();
				createBoard(crypto.randomUUID().toString());
			}}
		>
			<h3>
				<FontAwesomeIcon icon={faKey} size={"1x"}/>
				{" "}
				Privato
			</h3>
			<p>
				Crea un nuovo tabellone privato utilizzando un codice segreto autogenerato!
				<br/>
				<small>Esso sarà accessibile solo da chi ne conosce il link.</small>
			</p>
			<label className={"float-bottom"}>
				<span/>
				<button>
					Crea
				</button>
				<span/>
			</label>
		</form>
	)
}
