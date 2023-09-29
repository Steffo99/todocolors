import {AVAILABLE_LOCALES} from "@/app/(i18n)/(locales)"
import Negotiator from "negotiator"
import {NextRequest, NextResponse} from "next/server"


export function middleware(request: NextRequest) {
	// https://nextjs.org/docs/app/building-your-application/routing/internationalization
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = AVAILABLE_LOCALES.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )
	if(!pathnameIsMissingLocale) {
		return NextResponse.next()
	}
	const negotiator = new Negotiator(request as any)
	const bestLocale = negotiator.language(AVAILABLE_LOCALES)
	return NextResponse.rewrite(`${request.nextUrl.protocol}//${request.nextUrl.host}/${bestLocale}${pathname}`)
}

export const config = {
	matcher: [
		'/((?!api|_next|manifest.json|logo-[nw]bg-[0-9]*.png|favicon-[nw]bg.ico).*)',
	]
}
