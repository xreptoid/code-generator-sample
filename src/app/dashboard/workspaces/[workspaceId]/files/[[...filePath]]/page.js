import reptoid from '@/lib/reptoid'
import EditorFrame from './components/EditorFrame'
import { getCurrentAccount } from '@/lib/session'

export const dynamic = 'force-dynamic'

export default async function Repos({ params }) {
    const { accountId, email } = await getCurrentAccount()
    const filePath = (params.filePath || ['', '']).join('/')
    const fileData = await reptoid.account(accountId).workspace(params.workspaceId).file(filePath).read()
    return <>
        <EditorFrame filePath={filePath} fileData={fileData}/>
    </>
}
