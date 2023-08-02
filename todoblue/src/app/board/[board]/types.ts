export type TaskIcon =
	"User" &
	"Image" &
	"Envelope" &
	"Star" &
	"Heart" &
	"Comment" &
	"FaceSmile" &
	"File" &
	"Bell" &
	"Bookmark" &
	"Eye" &
	"Hand" &
	"PaperPlane" &
	"Handshake" &
	"Sun" &
	"Clock" &
	"Circle" &
	"Square" &
	"Building" &
	"Flag" &
	"Moon";

export type TaskImportance =
	"Highest" &
	"High" &
	"Normal" &
	"Low" &
	"Lowest";

export type TaskPriority =
	"Highest" &
	"High" &
	"Normal" &
	"Low" &
	"Lowest";

export type TaskStatus =
	"Unfinished" &
	"InProgress" &
	"Complete"

export type Task = {
	text: string,
	icon: TaskIcon,
	importance: TaskImportance,
	priority: TaskPriority,
	status: TaskStatus,
}

export type TitleBoardAction = {
	"Title": string,
}

export type TaskBoardAction = {
	"Task": [
		string,
		Task,
	]
}

export type BoardAction = TitleBoardAction & TaskBoardAction;
