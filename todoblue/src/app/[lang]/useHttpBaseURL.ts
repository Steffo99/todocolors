import {useEffect, useState} from "react"


/**
 * **Hook** returning the base URL to use in API calls.
 *
 * Obtains the base URL from `window.location`, unless the `NEXT_PUBLIC_TODOBLUE_OVERRIDE_BASE_URL` environment variable is set, which takes precedence in that case.
 */
export function useHttpBaseURL(): string | undefined {
    const [baseURL, setBaseURL] = useState<string | undefined>(undefined);

    useEffect(() => {
        let url = process.env.NEXT_PUBLIC_TODOBLUE_OVERRIDE_BASE_URL;
        if(!url) url = `${window.location.protocol}//${window.location.host}/api`;
        console.debug("[useBaseURL] Using base URL:", url);
        setBaseURL(url);
    }, []);

    return baseURL;
}
