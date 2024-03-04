import Reptoid from '@reptoid/codebases'
import EditorFrame from './components/EditorFrame'

export const dynamic = 'force-dynamic'

const reptoid = new Reptoid({
    apiHost: 'http://localhost:3010',
    accessToken: process.env.REPTOID_ACCESS_TOKEN
})

export default async function Repos({ params }) {
    const accountId = '230145c4-69c6-4f49-a4c2-0d1c6ba993a3'
    const workspaceId = '6c9e85c8-b7e1-4e34-8c1d-3e7c653505bd'
    const filePath = (params.filePath || ['', '']).join('/')
    const fileData = await reptoid.account(accountId).workspace(workspaceId).file(filePath).read()
    return <>
        <EditorFrame filePath={filePath} fileData={fileData}/>
    </>
}
