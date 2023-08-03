export type TaskIcon =
	"User" |
	"Image" |
	"Envelope" |
	"Star" |
	"Heart" |
	"Comment" |
	"FaceSmile" |
	"File" |
	"Bell" |
	"Bookmark" |
	"Eye" |
	"Hand" |
	"PaperPlane" |
	"Handshake" |
	"Sun" |
	"Clock" |
	"Circle" |
	"Square" |
	"Building" |
	"Flag" |
	"Moon";

export type TaskImportance =
	"Highest" |
	"High" |
	"Normal" |
	"Low" |
	"Lowest";

export const IMPORTANCE_TO_NUMBER = {
	"Highest": 5,
	"High": 4,
	"Normal": 3,
	"Low": 2,
	"Lowest": 1,
}

export const IMPORTANCE_TO_STRING = {
	"Highest": "Critico",
	"High": "Importante",
	"Normal": "Normale",
	"Low": "Opzionale",
	"Lowest": "Irrilevante"
}

export type TaskPriority =
	"Highest" |
	"High" |
	"Normal" |
	"Low" |
	"Lowest";

export const PRIORITY_TO_NUMBER = {
	"Highest": 5,
	"High": 4,
	"Normal": 3,
	"Low": 2,
	"Lowest": 1,
}

export const PRIORITY_TO_STRING = {
	"Highest": "Urgente",
	"High": "Prioritario",
	"Normal": "Normale",
	"Low": "Rimandabile",
	"Lowest": "In qualsiasi momento"
}

export type TaskStatus =
	"Unfinished" |
	"InProgress" |
	"Complete";

export type Task = {
	text: string,
	icon: TaskIcon,
	importance: TaskImportance,
	priority: TaskPriority,
	status: TaskStatus,
}

export type TaskWithId = Task & {
	id: string,
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

export type BoardAction =
	TitleBoardAction |
	TaskBoardAction;
