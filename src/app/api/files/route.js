import Reptoid from '@reptoid/codebases'

const reptoid = new Reptoid({
    apiHost: 'http://localhost:3010',
    accessToken: process.env.REPTOID_ACCESS_TOKEN
})

export async function POST(request) {
    const { filePath, content } = await request.json()
    const accountId = '230145c4-69c6-4f49-a4c2-0d1c6ba993a3'
    const workspaceId = '6c9e85c8-b7e1-4e34-8c1d-3e7c653505bd'
    await reptoid.account(accountId).workspace(workspaceId).file(filePath).write(content)
    
    return Response.json({
        result: 'ok'
    })
}