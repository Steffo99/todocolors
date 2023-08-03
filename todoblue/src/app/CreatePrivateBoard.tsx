"use client";

import {useBoardCreator} from "@/app/useBoardCreator"
import {faKey} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import {default as React} from "react"

export function CreatePrivateBoard() {
	const {createBoard} = useBoardCreator();

	const isSecure = typeof window !== "undefined" && window.isSecureContext;

	return (
		<form
			className={classNames({
				"panel": true,
				"box": true,
				"form-flex": true,
				"red": !isSecure,
			})}
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
			{isSecure ?
			 	<>
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
				</> : <>
					<p>
						Questa funzionalità non è disponibile al di fuori di contesti sicuri.
						<br/>
						<small>Assicurati di stare usando HTTPS!</small>
					</p>
				</>
			}
		</form>
	)
}
