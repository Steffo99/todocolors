import {KEBABIFIER} from "@/app/(utils)/(kebab)/kebabifier"
import {ReturnTypeOfUseState} from "@/app/(utils)/ReturnTypeOfUseState"
import {useCallback, useState} from "react"


/**
 * **Hook** which alters a hook with the same interface as {@link useState}, but replaces non-alphanumeric characters with dashes and converts to uppercase the whole string.
 * @param stateHook The hook to alter.
 */
export function useUpperKebabifier(stateHook: ReturnTypeOfUseState<string | undefined>): [string | undefined, (v: string) => void] {
	const [state, setInnerState] = stateHook

	const setState = useCallback((inputString: string) => {
		const kebabifiedString = inputString.toUpperCase().replaceAll(KEBABIFIER, "-");
		setInnerState(kebabifiedString);
	}, [])

	return [state, setState]
}
