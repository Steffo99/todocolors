"use client";
import {createContext, ReactNode, useContext} from "react"


/**
 * **Object** containing the site options configurable via runtime environment variables.
 */
export interface ServersideConfiguration {
	siteName: string,
	baseURL: string,
}

/**
 * **Context** where the {@link ServersideConfiguration} is stored in.
 */
export const ServersideConfigurationContext = createContext<ServersideConfiguration | null>(null);

/**
 * **Component** acting as a provider for the {@link ServersideConfigurationContext} for its children.
 *
 * Required to execute only on the client.
 *
 * @param value The {@link ServersideConfiguration} to provide.
 * @param children The {@link ReactNode}s to provide the {@link ServersideConfiguration} to.
 * @constructor
 */
export function ServersideConfigurationManager({value, children}: {value: ServersideConfiguration, children: ReactNode}) {
	return (
		<ServersideConfigurationContext.Provider value={value}>
			{children}
		</ServersideConfigurationContext.Provider>
	)
}

/**
 * **Hook** to access the globally provided {@link ServersideConfiguration} from children components.
 */
export function useServersideConfiguration(): ServersideConfiguration {
	const context = useContext(ServersideConfigurationContext);

	if(context === null) {
		console.error("[useServersideConfiguration] Was used outside of a ServersideConfigurationContext!")
		throw Error("Used useServersideConfiguration outside of a ServersideConfigurationContext.")
	}

	return context
}
