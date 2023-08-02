"use client"

import {useBoardCreator} from "@/app/useBoardCreator"
import {useLowerKebabState} from "@/app/useKebabState"
import {faGlobe} from "@fortawesome/free-solid-svg-icons"
import {default as React} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export function CreatePublicBoard() {
	const [code, setCode] = useLowerKebabState("")
	const {createBoard} = useBoardCreator();

	return (
		<form
			className={"panel box form-flex"}
			onSubmit={e => {
				e.preventDefault();
				createBoard(code);
			}}
		>
			<h3>
				<FontAwesomeIcon icon={faGlobe}/>
				{" "}
				Pubblico
			</h3>
			<p>
				Crea un nuovo tabellone pubblico, con un codice personalizzato!
				<br/>
				<small>Se un tabellone con quel codice esiste già, sarai reindirizzato ad esso.</small>
			</p>
			<label className={"float-bottom"}>
				<span>
					Codice
				</span>
				<input
					type={"text"}
					placeholder={"garasauto-planning-2023"}
					value={code}
					onChange={(
						e => setCode(e.target.value)
					)}
				/>
				<span/>
			</label>
			<label>
				<span/>
				<button
					onClick={_ => createBoard(code)}
				>
					Crea
				</button>
				<span/>
			</label>
		</form>
	)
}
