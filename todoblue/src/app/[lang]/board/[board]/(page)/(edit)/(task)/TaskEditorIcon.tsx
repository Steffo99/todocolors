import {TaskIcon} from "@/app/[lang]/board/[board]/(api)/(task)"
import {TaskIconComponent} from "@/app/[lang]/board/[board]/(page)/(task)/TaskIconComponent"
import {TaskSimplifiedStatus} from "@/app/[lang]/board/[board]/(page)/(task)/TaskSimplifiedStatus"
import {TFunction} from "i18next"
import {SyntheticEvent} from "react"


const ICON_TO_KEY = {
    [TaskIcon.Bookmark]: "taskIconBookmark",
    [TaskIcon.Circle]: "taskIconCircle",
    [TaskIcon.Square]: "taskIconSquare",
    [TaskIcon.Heart]: "taskIconHeart",
    [TaskIcon.Star]: "taskIconStar",
    [TaskIcon.Sun]: "taskIconSun",
    [TaskIcon.Moon]: "taskIconMoon",
    [TaskIcon.Eye]: "taskIconEye",
    [TaskIcon.Hand]: "taskIconHand",
    [TaskIcon.Handshake]: "taskIconHandshake",
    [TaskIcon.FaceSmile]: "taskIconFaceSmile",
    [TaskIcon.User]: "taskIconUser",
    [TaskIcon.Comment]: "taskIconComment",
    [TaskIcon.Envelope]: "taskIconEnvelope",
    [TaskIcon.File]: "taskIconFile",
    [TaskIcon.PaperPlane]: "taskIconPaperPlane",
    [TaskIcon.Building]: "taskIconBuilding",
    [TaskIcon.Flag]: "taskIconFlag",
    [TaskIcon.Bell]: "taskIconBell",
    [TaskIcon.Clock]: "taskIconClock",
    [TaskIcon.Image]: "taskIconImage",
}

export function TaskEditorIcon({t, icon, nextIcon}: {t: TFunction, icon: TaskIcon, nextIcon: (e: SyntheticEvent<HTMLButtonElement>) => void}) {
    return (
        <TaskIconComponent
            title={t(ICON_TO_KEY[icon])}
            icon={icon}
            status={TaskSimplifiedStatus.NonExistent}
            onInteract={nextIcon}
        />
    )
}
