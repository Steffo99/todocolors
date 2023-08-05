import {useServersideConfiguration} from "@/app/ServersideConfigurationManager"
import {useMemo} from "react"


export function useBoardWebSocketURL(name: string) {
	const {baseURL} = useServersideConfiguration()

    const webSocketURL = useMemo(() => `${baseURL}/board/${name}/ws`, [name]);
    return {webSocketURL}
}
