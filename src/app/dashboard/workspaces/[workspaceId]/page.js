import reptoid from "@/lib/reptoid"
import RandomAI from "./components/RandomAI"
import { getCurrentAccount } from "@/lib/session"
import Link from "next/link"
import { redirect } from "next/navigation"


export default async function Page({ params }) {
    const { workspaceId } = params
    const { accountId } = await getCurrentAccount()
    
    let gitStatus = null
    try {
        gitStatus = await reptoid.account(accountId).workspace(workspaceId).git().status()
    } catch (e) {
    }
    let gitDiff = null
    if (gitStatus) {
        gitDiff = await reptoid.account(accountId).workspace(workspaceId).git().diff()
    }

    async function initializeGit() {
        'use server'
        await reptoid.account(accountId).workspace(workspaceId).git().init()
        redirect(`/dashboard/workspaces/${workspaceId}`)
    }

    return <div className="mt-6">
        <div>
            <RandomAI workspaceId={workspaceId}/>
        </div>
        <div className="mt-6">
            {
                gitStatus
                    ? <div>
                        <div>
                            Branch: <b>{gitStatus.current}</b>
                        </div>
                        {
                            gitStatus.not_added.length
                                ? <div className="mt-6">
                                    <div>New files:</div>
                                    {gitStatus.not_added.map(path => (
                                        <div key={`new-file-${path}`}>
                                            <Link href={`/dashboard/workspaces/${workspaceId}/files/${path}`} className="font-bold underline">{path}</Link>
                                        </div>
                                    ))}
                                </div>
                                : <></>
                        }
                        <div className="mt-6">
                            <div>
                                <pre>{gitDiff}</pre>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <div>git is not initalized</div>
                        <div className="mt-2">
                            <form action={initializeGit}>
                                <button className="bg-black text-white px-3 py-2">Initialize</button>
                            </form>
                        </div>
                    </div>
            }
        </div>
    </div>
}