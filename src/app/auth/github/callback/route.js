import reptoid from "@/lib/reptoid"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {
    try {
        const code = request.nextUrl.searchParams.get('code')
        const redirectUri = request.nextUrl.searchParams.get('redirect_uri')

        // TODO catch errors with redirect
        /*
        const accessToken = await reptoid.github().getAccessTokenByCode(code)
        const { email } = await reptoid.github().auth(accessToken).getUserWithEmail()
        await reptoid.account({ email, upsert: true }).github().setAcessToken(accessToken)
        */

        const { accountId, accessToken, email, githubUsername } = await reptoid.github().authByCode(code)

        console.log({ accountId })

        const session = await getIronSession(cookies(), { password: process.env.IRON_SESSION_PASSWORD, cookieName: "session" });
        session.accountId = accountId
        await session.save()

        redirect(redirectUri || '/')
    } catch (e) {
        if (e.message === 'NEXT_REDIRECT') {
            throw e
        }
        console.log(`Global error: ${e}`)
        redirect('/auth?err=unknown')
    }
}
