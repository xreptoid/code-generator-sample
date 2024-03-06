import reptoid from "@/lib/reptoid"
import { getCurrentAccount } from "@/lib/session"

export async function POST(request) {
    const { repoPath } = await request.json()
    const { accountId } = await getCurrentAccount()
    console.log('pbfs req...')
    const resp = await reptoid.account(accountId).github().clone(repoPath)
    console.log('pbfs ok', resp)
    
    return Response.json({
        result: 'ok'
    })
}