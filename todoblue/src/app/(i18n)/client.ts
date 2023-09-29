"use client";
import "client-only"
import {createInstance, i18n} from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import {useEffect, useState} from "react"


async function init(lang: string, ns: string): Promise<i18n> {
    const instance = createInstance()
    await instance
    .use(resourcesToBackend((language: string, namespace: string) => import(`./(locales)/(${namespace})/${language}.json`)))
    .init({
        supportedLngs: ["en-US"],
        fallbackLng: "en-US",
        lng: lang,
        fallbackNS: "common",
        defaultNS: "common",
        ns,
    })
    return instance
}

export function useClientTranslation(lang: string, ns: string) {
    const [instance, setInstance] = useState<i18n | undefined>(undefined);

    useEffect(
        () => {
            console.debug("[useTranslation] Initializing translation with:", lang, ":", ns)
            init(lang, ns).then((v: i18n) => {
                console.debug("[useTranslation] Initialized i18n:", v)
                return setInstance(v)
            })
        },
        [lang, ns]
    )

    return {
        t: instance?.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns) ?? ((...args) => `${args}`) as (...args: any) => string,  // FIXME: Typing for this function is incorrect.
        i18n: instance,
    }
}
