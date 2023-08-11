import {TaskIcon} from "./TaskIcon"
import {faBell as faBellRegular, faBookmark as faBookmarkRegular, faBuilding as faBuildingRegular, faCircle as faCircleRegular, faClock as faClockRegular, faComment as faCommentRegular, faEnvelope as faEnvelopeRegular, faEye as faEyeRegular, faFaceSmile as faFaceSmileRegular, faFile as faFileRegular, faFlag as faFlagRegular, faHand as faHandRegular, faHandshake as faHandshakeRegular, faHeart as faHeartRegular, faImage as faImageRegular, faMoon as faMoonRegular, faPaperPlane as faPaperPlaneRegular, faSquare as faSquareRegular, faStar as faStarRegular, faSun as faSunRegular, faUser as faUserRegular} from "@fortawesome/free-regular-svg-icons"
import {faBell as faBellSolid, faBookmark as faBookmarkSolid, faBuilding as faBuildingSolid, faCircle as faCircleSolid, faClock as faClockSolid, faComment as faCommentSolid, faEnvelope as faEnvelopeSolid, faEye as faEyeSolid, faFaceSmile as faFaceSmileSolid, faFile as faFileSolid, faFlag as faFlagSolid, faHand as faHandSolid, faHandshake as faHandshakeSolid, faHeart as faHeartSolid, faImage as faImageSolid, faMoon as faMoonSolid, faPaperPlane as faPaperPlaneSolid, faSquare as faSquareSolid, faStar as faStarSolid, faSun as faSunSolid, faUser as faUserSolid} from "@fortawesome/free-solid-svg-icons"


export const TASK_ICON_TO_FONTAWESOME_SOLID = {
	[TaskIcon.User]: faUserSolid,
	[TaskIcon.Image]: faImageSolid,
	[TaskIcon.Envelope]: faEnvelopeSolid,
	[TaskIcon.Star]: faStarSolid,
	[TaskIcon.Heart]: faHeartSolid,
	[TaskIcon.Comment]: faCommentSolid,
	[TaskIcon.FaceSmile]: faFaceSmileSolid,
	[TaskIcon.File]: faFileSolid,
	[TaskIcon.Bell]: faBellSolid,
	[TaskIcon.Bookmark]: faBookmarkSolid,
	[TaskIcon.Eye]: faEyeSolid,
	[TaskIcon.Hand]: faHandSolid,
	[TaskIcon.PaperPlane]: faPaperPlaneSolid,
	[TaskIcon.Handshake]: faHandshakeSolid,
	[TaskIcon.Sun]: faSunSolid,
	[TaskIcon.Clock]: faClockSolid,
	[TaskIcon.Circle]: faCircleSolid,
	[TaskIcon.Square]: faSquareSolid,
	[TaskIcon.Building]: faBuildingSolid,
	[TaskIcon.Flag]: faFlagSolid,
	[TaskIcon.Moon]: faMoonSolid,
}

export const TASK_ICON_TO_FONTAWESOME_REGULAR = {
	[TaskIcon.User]: faUserRegular,
	[TaskIcon.Image]: faImageRegular,
	[TaskIcon.Envelope]: faEnvelopeRegular,
	[TaskIcon.Star]: faStarRegular,
	[TaskIcon.Heart]: faHeartRegular,
	[TaskIcon.Comment]: faCommentRegular,
	[TaskIcon.FaceSmile]: faFaceSmileRegular,
	[TaskIcon.File]: faFileRegular,
	[TaskIcon.Bell]: faBellRegular,
	[TaskIcon.Bookmark]: faBookmarkRegular,
	[TaskIcon.Eye]: faEyeRegular,
	[TaskIcon.Hand]: faHandRegular,
	[TaskIcon.PaperPlane]: faPaperPlaneRegular,
	[TaskIcon.Handshake]: faHandshakeRegular,
	[TaskIcon.Sun]: faSunRegular,
	[TaskIcon.Clock]: faClockRegular,
	[TaskIcon.Circle]: faCircleRegular,
	[TaskIcon.Square]: faSquareRegular,
	[TaskIcon.Building]: faBuildingRegular,
	[TaskIcon.Flag]: faFlagRegular,
	[TaskIcon.Moon]: faMoonRegular,
}
