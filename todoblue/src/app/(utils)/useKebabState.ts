"use client";

import {useCallback, useState} from "react"


/**
 * **Regex** identifying the characters to be replaced with dashes in {@link useAnyKebabState}, {@link useLowerKebabState}, and {@link useUpperKebabState}.
 */
const KEBABIFIER = /[^a-zA-Z0-9-]/g

/**
 * **Hook** similar to {@link useState}, but replace non-alphanumeric characters with dashes.
 * @param initial
 */
export function useAnyKebabState(initial: string): [string, (inputString: string) => void] {
	const [state, setInnerState] = useState<string>(initial);

	const setState = useCallback((inputString: string) => {
		const kebabifiedString = inputString.replaceAll(KEBABIFIER, "-");
		setInnerState(kebabifiedString);
	}, [])

	return [state, setState]
}

/**
 * **Hook** similar to {@link useState}, but replaces non-alphanumeric characters with dashes and converts to lowercase the whole string.
 * @param initial
 */
export function useLowerKebabState(initial: string): [string, (inputString: string) => void] {
	const [state, setInnerState] = useState<string>(initial);

	const setState = useCallback((inputString: string) => {
		const kebabifiedString = inputString.toLowerCase().replaceAll(KEBABIFIER, "-");
		setInnerState(kebabifiedString);
	}, [])

	return [state, setState]
}

/**
 * **Hook** similar to {@link useState}, but replaces non-alphanumeric characters with dashes and converts to uppercase the whole string.
 * @param initial
 */
export function useUpperKebabState(initial: string): [string, (inputString: string) => void] {
	const [state, setInnerState] = useState<string>(initial);

	const setState = useCallback((inputString: string) => {
		const kebabifiedString = inputString.toUpperCase().replaceAll(KEBABIFIER, "-");
		setInnerState(kebabifiedString);
	}, [])

	return [state, setState]
}
