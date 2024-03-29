import reptoid from "@/lib/reptoid"
import { getCurrentAccount } from "@/lib/session"

export async function POST(request) {
    const { workspaceId, filePath, content } = await request.json()
    const { accountId } = await getCurrentAccount()
    await reptoid.account(accountId).workspace(workspaceId).file(filePath).write(content)
    
    return Response.json({
        result: 'ok'
    })
}