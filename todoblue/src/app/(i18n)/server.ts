import {createInstance, i18n} from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import "server-only"


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

export async function useServerTranslation(lang: string, ns: string) {
    const instance = await init(lang, ns)
    return {
        t: instance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
        i18n: instance
    }
}
