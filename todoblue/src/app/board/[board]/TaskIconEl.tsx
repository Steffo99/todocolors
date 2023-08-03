import {TaskIcon} from "@/app/board/[board]/Types"
import {SizeProp} from "@fortawesome/fontawesome-svg-core"
import {
	faUser as faUserSolid,
	faImage as faImageSolid,
	faEnvelope as faEnvelopeSolid,
	faStar as faStarSolid,
	faHeart as faHeartSolid,
	faComment as faCommentSolid,
	faFaceSmile as faFaceSmileSolid,
	faFile as faFileSolid,
	faBell as faBellSolid,
	faBookmark as faBookmarkSolid,
	faEye as faEyeSolid,
	faHand as faHandSolid,
	faPaperPlane as faPaperPlaneSolid,
	faHandshake as faHandshakeSolid,
	faSun as faSunSolid,
	faClock as faClockSolid,
	faCircle as faCircleSolid,
	faSquare as faSquareSolid,
	faBuilding as faBuildingSolid,
	faFlag as faFlagSolid,
	faMoon as faMoonSolid,
} from "@fortawesome/free-solid-svg-icons"
import {
	faUser as faUserRegular,
	faImage as faImageRegular,
	faEnvelope as faEnvelopeRegular,
	faStar as faStarRegular,
	faHeart as faHeartRegular,
	faComment as faCommentRegular,
	faFaceSmile as faFaceSmileRegular,
	faFile as faFileRegular,
	faBell as faBellRegular,
	faBookmark as faBookmarkRegular,
	faEye as faEyeRegular,
	faHand as faHandRegular,
	faPaperPlane as faPaperPlaneRegular,
	faHandshake as faHandshakeRegular,
	faSun as faSunRegular,
	faClock as faClockRegular,
	faCircle as faCircleRegular,
	faSquare as faSquareRegular,
	faBuilding as faBuildingRegular,
	faFlag as faFlagRegular,
	faMoon as faMoonRegular,
} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export const ICONS = {
	solid: {
		"User": faUserSolid,
		"Image": faImageSolid,
		"Envelope": faEnvelopeSolid,
		"Star": faStarSolid,
		"Heart": faHeartSolid,
		"Comment": faCommentSolid,
		"FaceSmile": faFaceSmileSolid,
		"File": faFileSolid,
		"Bell": faBellSolid,
		"Bookmark": faBookmarkSolid,
		"Eye": faEyeSolid,
		"Hand": faHandSolid,
		"PaperPlane": faPaperPlaneSolid,
		"Handshake": faHandshakeSolid,
		"Sun": faSunSolid,
		"Clock": faClockSolid,
		"Circle": faCircleSolid,
		"Square": faSquareSolid,
		"Building": faBuildingSolid,
		"Flag": faFlagSolid,
		"Moon": faMoonSolid,
	},
	regular: {
		"User": faUserRegular,
		"Image": faImageRegular,
		"Envelope": faEnvelopeRegular,
		"Star": faStarRegular,
		"Heart": faHeartRegular,
		"Comment": faCommentRegular,
		"FaceSmile": faFaceSmileRegular,
		"File": faFileRegular,
		"Bell": faBellRegular,
		"Bookmark": faBookmarkRegular,
		"Eye": faEyeRegular,
		"Hand": faHandRegular,
		"PaperPlane": faPaperPlaneRegular,
		"Handshake": faHandshakeRegular,
		"Sun": faSunRegular,
		"Clock": faClockRegular,
		"Circle": faCircleRegular,
		"Square": faSquareRegular,
		"Building": faBuildingRegular,
		"Flag": faFlagRegular,
		"Moon": faMoonRegular,
	}
}


export function TaskIconEl({icon, style, size}: {icon: TaskIcon, style: "solid" | "regular", size?: SizeProp}) {
	return (
		<FontAwesomeIcon icon={ICONS[style][icon]} size={size}/>
	)
}
