"use client";

import {useClientTranslation} from "@/app/(i18n)/client"
import {useLowerKebabifier} from "@/app/(utils)/(kebab)"
import {faKey} from "@fortawesome/free-solid-svg-icons"
import cn from "classnames"
import {useRouter} from "next/navigation"
import {default as React, SyntheticEvent, useCallback, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export function KnownBoardsPanel({lang}: {lang: string}) {
    const {t} = useClientTranslation(lang, "root")
    const [code, setCode] = useLowerKebabifier(useState<string | undefined>(undefined))
    const router = useRouter();

    const codeIsValid = code && code.length >= 1

    const moveToBoardValidated = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        if(!codeIsValid) {
            console.debug("[KnownBoardsPanel] Code is not valid, refusing to move to board.");
            return
        }
        console.debug("[KnownBoardsPanel] Moving to board with given code...");
        router.push(`/board/${code}`);
    }, [code, codeIsValid, router])

    return (
        <form
            className={"panel box form-flex"}
            onSubmit={moveToBoardValidated}
        >
            <h3>
                <FontAwesomeIcon icon={faKey}/>
                {" "}
                {t("existingKnownBoardsTitle")}
            </h3>
            <p>
                {t("existingKnownBoardsDescription")}
                <br/>
                <small>{t("existingKnownBoardsSmall")}</small>
            </p>
            <label className={"float-bottom"}>
				<span>
					{t("existingKnownBoardsCodeLeft")}
				</span>
                <input
                    type={"text"}
                    placeholder={t("existingKnownBoardsCodePlaceholder")}
                    value={code ?? ""}
                    onChange={e => setCode(e.target.value)}
                />
                <span/>
            </label>
            <label>
                <span/>
                <button
                    onClick={moveToBoardValidated}
                    className={cn({"fade": !codeIsValid})}
                >
                    {t("existingKnownBoardsSubmitText")}
                </button>
                <span/>
            </label>
        </form>
    )
}
