import reptoid from "@/lib/reptoid"
import { getCurrentAccount } from "@/lib/session"

export async function POST(req) {
    const { accountId } = await getCurrentAccount()
    const { name } = await req.json()
    await reptoid.account(accountId).workspaces().create({ meta: { name }})
    return Response.json({
        result: 'ok'
    })
}