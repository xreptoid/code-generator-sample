import reptoid from '@/lib/reptoid'
import EditorFrame from './components/EditorFrame'
import { getCurrentAccount } from '@/lib/session'
import Link from 'next/link'
import FolderFrame from './components/FolderFrame'

export const dynamic = 'force-dynamic'

export default async function Page({ params }) {
    const { accountId, email } = await getCurrentAccount()
    const filePath = (params.filePath || ['', '']).join('/')
    const fileOrFolderData = await reptoid.account(accountId).workspace(params.workspaceId).file(filePath).read()
    return <>
        <div>
            <PathNav workspaceId={params.workspaceId} path={filePath} isFile={fileOrFolderData.type === "file"}/>
        </div>
        {
            fileOrFolderData.type === "file"
                ? <EditorFrame filePath={filePath} fileData={fileOrFolderData} />
                : <FolderFrame workspaceId={params.workspaceId} path={filePath} folderData={fileOrFolderData}/>
        }
    </>
}

function PathNav({ workspaceId, path, isFile }) {
    const parts = path.split('/').filter(part => part.length)
    const partsWithMeta = []
    let currentPath = ''
    for (let i = 0; i < parts.length; ++i) {
        currentPath += '/' + parts[i],
            partsWithMeta.push({
                part: parts[i],
                uri: `/dashboard/workspaces/${workspaceId}/files/${currentPath}`,
                isFirst: i === 0,
                isLast: i === parts.length - 1,
            })
    }

    return <div className='mb-3'>
        {partsWithMeta.length
            ? <Link
                className='text-slate-500 no-underline hover:text-black hover:font-bold hover:underline'
                href={`/dashboard/workspaces/${workspaceId}/files`}
            >root</Link>
            : 'root'
        }
        {partsWithMeta.map(({ part, uri, isFirst, isLast }) =>
            <>
                <span className='text-lg mx-2'>/</span>
                {isLast
                    ? part
                    : <Link
                        className='text-slate-500 no-underline hover:text-black hover:font-bold hover:underline'
                        href={uri}
                    >{part}</Link>
                }
            </>
        )}
        {!isFile
            ? <span className='text-lg mx-2'>/</span>
            : <></>
        }
    </div>
}