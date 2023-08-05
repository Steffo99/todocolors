import {useHttpBaseURL} from "@/app/useHttpBaseURL"


/**
 * **Hook** similar to {@link useHttpBaseURL}, but returning the websocket URL instead.
 */
export function useWsBaseURL() {
    return useHttpBaseURL()?.replace(/^http/, "ws")
}