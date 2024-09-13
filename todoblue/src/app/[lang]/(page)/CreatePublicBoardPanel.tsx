"use client";

import {useClientTranslation} from "@/app/(i18n)/client"
import {useLowerKebabifier} from "@/app/(utils)/(kebab)"
import {fas} from "@awesome.me/kit-dfe340c874/icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import cn from "classnames"
import {useRouter} from "next/navigation"
import {default as React, SyntheticEvent, useCallback, useState} from "react"


export function CreatePublicBoardPanel({lang}: {lang: string}) {
	const {t} = useClientTranslation(lang, "root")
	const [code, setCode] = useLowerKebabifier(useState<string | undefined>(undefined))
	const router = useRouter();

	const codeIsValid = code && code.length >= 1

	const createBoardValidated = useCallback((e: SyntheticEvent) => {
		e.preventDefault();
		if(!codeIsValid) {
			console.debug("[CreatePublicBoardPanel] Code is not valid, refusing to create board.");
			return
		}
		console.debug("[CreatePublicBoardPanel] Creating public board with code:", code);
		router.push(`/board/${code}`);
	}, [code, codeIsValid, router])

	return (
		<form
			className={"panel box form-flex"}
			onSubmit={createBoardValidated}
		>
			<h3>
				<FontAwesomeIcon icon={fas.faGlobe}/>
				{" "}
				{t("createPublicBoardTitle")}
			</h3>
			<p>
				{t("createPublicBoardDescription")}
				<br/>
				<small>{t("createPublicBoardSmall")}</small>
			</p>
			<label className={"float-bottom"}>
				<span>
					{t("createPublicBoardCodeLeft")}
				</span>
				<input
					type={"text"}
					placeholder={t("createPublicBoardCodePlaceholder")}
					value={code ?? ""}
					onChange={e => setCode(e.target.value)}
				/>
				<span/>
			</label>
			<label>
				<span/>
				<button
					onClick={createBoardValidated}
					className={cn({"fade": !codeIsValid})}
				>
					{t("createPublicBoardSubmitText")}
				</button>
				<span/>
			</label>
		</form>
	)
}
