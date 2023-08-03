import style from "./BoardError.module.css"
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import classNames from "classnames"


export function BoardError({text}: {text: string}) {
	return (
		<main className={classNames("red", style.boardError)}>
			<div>
				<FontAwesomeIcon size={"4x"} icon={faExclamationCircle}/>
			</div>
			<div>
				{text}
			</div>
		</main>
	)
}
