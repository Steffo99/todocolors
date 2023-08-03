import {TaskGroupColumn} from "@/app/board/[board]/TaskGroupColumn"
import {useBoardContext} from "@/app/board/[board]/useBoardContext"


export function BoardColumns() {
	const {taskGroups} = useBoardContext()

	return (
		<div className={"chapter-5"}>
			{taskGroups.map((tg) => <TaskGroupColumn taskGroup={tg}/>)}
		</div>
	)
}
