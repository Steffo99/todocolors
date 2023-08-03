import style from "./BoardLoading.module.css"
import {faSpinner} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export function BoardLoading({text}: {text: string}) {
	return (
		<main className={style.boardLoading}>
			<div>
				<FontAwesomeIcon size={"4x"} icon={faSpinner} pulse/>
			</div>
			<div>
				{text}
			</div>
		</main>
	)
}
