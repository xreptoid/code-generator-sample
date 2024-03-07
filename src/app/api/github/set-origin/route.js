import reptoid from "@/lib/reptoid"
import { getCurrentAccount } from "@/lib/session"

export async function POST(request) {
    const { workspaceId, newPath } = await request.json()
    const { accountId } = await getCurrentAccount()
    const resp = await reptoid.account(accountId).workspace(workspaceId).git().setOrigin({ platform: 'github', path: newPath })
    return Response.json({
        result: 'ok'
    })
}