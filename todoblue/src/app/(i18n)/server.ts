import "server-only";
import {createInstance, i18n} from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"


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

export async function useServerTranslation(lng: string, ns: string) {
    const instance = await init(lng, ns)
    return {
        t: instance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
        i18n: instance
    }
}
