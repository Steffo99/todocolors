"use client";
import "client-only";
import {createInstance, i18n} from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import {useEffect, useState} from "react"


async function init(lng: string, ns: string): Promise<i18n> {
    const instance = createInstance()
    await instance
    .use(resourcesToBackend((language: string, namespace: string) => import(`./(locales)/(${namespace})/${language}.json`)))
    .init({
        supportedLngs: ["en-US"],
        fallbackLng: "en-US",
        lng,
        fallbackNS: "common",
        defaultNS: "common",
        ns,
    })
    return instance
}

export function useClientTranslation(lng: string, ns: string) {
    const [instance, setInstance] = useState<i18n | undefined>(undefined);

    useEffect(
        () => {
            console.debug("[useTranslation] Initializing translation with:", lng, ":", ns)
            init(lng, ns).then((v: i18n) => {
                console.debug("[useTranslation] Initialized i18n:", v)
                return setInstance(v)
            })
        },
        [lng, ns]
    )

    return {
        t: instance?.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns) ?? ((...args) => `${args}`),
        i18n: instance,
    }
}
