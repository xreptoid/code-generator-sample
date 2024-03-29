import reptoid from "@/lib/reptoid"
import { getCurrentAccount } from "@/lib/session"

export async function POST(request) {
    const { repoPath } = await request.json()
    const { accountId } = await getCurrentAccount()
    const resp = await reptoid.account(accountId).github().clone(repoPath)
    
    return Response.json({
        result: 'ok'
    })
}