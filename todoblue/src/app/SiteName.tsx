import "server-only"

export function SiteName() {
	return <>
		{process.env["NEXT_PUBLIC_SITE_NAME"] ?? "Todoblue"}
	</>
}
