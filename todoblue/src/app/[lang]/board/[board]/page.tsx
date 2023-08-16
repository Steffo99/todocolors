import {BoardPage} from "@/app/[lang]/board/[board]/(page)/BoardPage"


export default function page({params: {lang}}: {params: {lang: string}}) {
	return (
		<BoardPage lang={lang}/>
	)
}
