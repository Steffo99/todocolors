import {BoardState} from "@/app/[lang]/board/[board]/(api)/(state)/BoardState"


/**
 * **Object** denoting the {@link BoardState} of a board where no {@link BoardAction}s have been performed.
 */
export const DEFAULT_BOARD_STATE: BoardState = {title: "", tasks: {}, clients: [], locked: false}
