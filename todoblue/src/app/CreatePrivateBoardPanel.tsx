"use client";

import {useBoardCreator} from "@/app/useBoardCreator"
import {faKey} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import {default as React, useEffect, useState} from "react"

export function CreatePrivateBoardPanel() {
	const {createBoard} = useBoardCreator();
	const [canCreate, setCanCreate] = useState<boolean | null>(null);

	useEffect(() => {
		setCanCreate(window.isSecureContext)
	}, [])

	let formContents;
	if(canCreate === null) {
		formContents = <MightCreateBoardFormContents/>
	}
	else if(!canCreate) {
		formContents = <CannotCreateBoardFormContents/>
	}
	else {
		formContents = <CanCreateBoardFormContents/>
	}

	return (
		<form
			className={classNames({
				"panel": true,
				"box": true,
				"form-flex": true,
				"fade": canCreate === null,
				"red": canCreate === false,
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
			{formContents}
		</form>
	)
}

function MightCreateBoardFormContents() {
	return <>
		<p>
			Sto verificando se è possibile creare un tabellone privato sul tuo browser...
			<br/>
			<small>Attendi un attimo...</small>
		</p>
	</>
}

function CanCreateBoardFormContents() {
	return <>
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
	</>
}

function CannotCreateBoardFormContents() {
	return <>
		<p>
			Questa funzionalità non è disponibile al di fuori di contesti sicuri.
			<br/>
			<small>Assicurati di stare usando HTTPS!</small>
		</p>
	</>
}
