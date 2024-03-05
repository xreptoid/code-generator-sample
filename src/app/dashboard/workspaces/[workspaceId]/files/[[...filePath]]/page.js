import reptoid from '@/lib/reptoid'
import EditorFrame from './components/EditorFrame'
import { getCurrentAccountId } from '@/lib/session'

export const dynamic = 'force-dynamic'

export default async function Repos({ params }) {
    const accountId = await getCurrentAccountId()
    const filePath = (params.filePath || ['', '']).join('/')
    const fileData = await reptoid.account(accountId).workspace(params.workspaceId).file(filePath).read()
    return <>
        <EditorFrame filePath={filePath} fileData={fileData}/>
    </>
}
