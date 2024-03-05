import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {
    const step = request.nextUrl.searchParams.get('step')
    if (step === '1') {
        redirect('/')
    }
    const session = await getIronSession(cookies(), { password: process.env.IRON_SESSION_PASSWORD, cookieName: 'session' })
    session.sid = undefined
    await session.save()
    redirect('/auth/logout?step=1')
}