"use client";

import {useCallback, useState} from "react"

const KEBABIFIER = /[^a-zA-Z0-9-]/g

export function useAnyKebabState(initial: string): [string, (inputString: string) => void] {
	const [state, setInnerState] = useState<string>(initial);

	const setState = useCallback((inputString: string) => {
		const kebabifiedString = inputString.replaceAll(KEBABIFIER, "-");
		setInnerState(kebabifiedString);
	}, [])

	return [state, setState]
}

export function useLowerKebabState(initial: string): [string, (inputString: string) => void] {
	const [state, setInnerState] = useState<string>(initial);

	const setState = useCallback((inputString: string) => {
		const kebabifiedString = inputString.toLowerCase().replaceAll(KEBABIFIER, "-");
		setInnerState(kebabifiedString);
	}, [])

	return [state, setState]
}

export function useUpperKebabState(initial: string): [string, (inputString: string) => void] {
	const [state, setInnerState] = useState<string>(initial);

	const setState = useCallback((inputString: string) => {
		const kebabifiedString = inputString.toUpperCase().replaceAll(KEBABIFIER, "-");
		setInnerState(kebabifiedString);
	}, [])

	return [state, setState]
}
