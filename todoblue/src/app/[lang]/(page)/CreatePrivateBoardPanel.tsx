"use client";

import {useClientTranslation} from "@/app/(i18n)/client"
import {faLock} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import {useRouter} from "next/navigation"
import {default as React, SyntheticEvent, useCallback, useEffect, useState} from "react"

export function CreatePrivateBoardPanel({lang}: {lang: string}) {
	const {t} = useClientTranslation(lang, "root")
	const router = useRouter();
	const [canCreate, setCanCreate] = useState<boolean | null>(null);

	useEffect(() => {
		setCanCreate(window.isSecureContext)
	}, [])

	const createBoardValidated = useCallback((e: SyntheticEvent) => {
		e.preventDefault();
		const code = crypto.randomUUID().toString();
		console.debug("[CreatePrivateBoardPanel] Creating private board...");
		router.push(`/board/${code}`);
	}, [router])

	let formContents;
	if(canCreate === null) {
		formContents = <>
			<p>
				{t("createPrivateBoardLoadingDescription")}
				<br/>
				<small>{t("createPrivateBoardLoadingSmall")}</small>
			</p>
		</>
	}
	else if(!canCreate) {
		formContents = <>
			<p>
				{t("createPrivateBoardUnavailableDescription")}
				<br/>
				<small>{t("createPrivateBoardUnavailableSmall")}</small>
			</p>
		</>
	}
	else {
		formContents = <>
			<p>
				{t("createPrivateBoardDescription")}
				<br/>
				<small>{t("createPrivateBoardSmall")}</small>
			</p>
			<label className={"float-bottom"}>
				<span/>
				<button onClick={createBoardValidated}>
					{t("createPrivateBoardSubmitText")}
				</button>
				<span/>
			</label>
		</>
	}

	return (
		<form
			className={classNames({
				"panel": true,
				"box": true,
				"form-flex": true,
				"red": canCreate === false,
			})}
			onSubmit={createBoardValidated}
		>
			<h3>
				<FontAwesomeIcon icon={faLock} size={"1x"}/>
				{" "}
				{t("createPrivateBoardTitle")}
			</h3>
			{formContents}
		</form>
	)
}
