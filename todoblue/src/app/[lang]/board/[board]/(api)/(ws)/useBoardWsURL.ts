import {useWsBaseURL} from "@/app/(api)/useWsBaseURL"
import {useMemo} from "react"


/**
 * **Hook** using {@link useWsBaseURL} to return the qualified URL to the WebSocket of the board with the given name.
 *
 * @param name The name of the board to use.
 */
export function useBoardWsURL(name: string) {
    const wsBaseURL = useWsBaseURL()
    // noinspection UnnecessaryLocalVariableJS
    const wsFullURL = useMemo(() => wsBaseURL ? `${wsBaseURL}/board/${name}/ws` : undefined, [wsBaseURL, name])

    return wsFullURL
}
