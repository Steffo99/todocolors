"use client";

import {useTranslation} from "@/app/(i18n)/client"
import {useLowerKebabState} from "@/app/[lang]/useKebabState"
import {faKey} from "@fortawesome/free-solid-svg-icons"
import cn from "classnames"
import {useRouter} from "next/navigation"
import {default as React, SyntheticEvent, useCallback} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export function KnownBoardsPanel({lng}: {lng: string}) {
    const {t} = useTranslation(lng, "root")
    const [code, setCode] = useLowerKebabState("")
    const router = useRouter();

    const codeIsValid = code.length >= 1

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
                    value={code}
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
