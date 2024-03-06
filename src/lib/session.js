'use server'
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export async function getCurrentAccount() {
    const session = await getIronSession(cookies(), { password: process.env.IRON_SESSION_PASSWORD, cookieName: 'session' })
    return { accountId: session.accountId, email: session.email }
}