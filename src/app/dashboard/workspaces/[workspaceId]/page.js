import reptoid from "@/lib/reptoid"
import RandomAI from "./components/RandomAI"
import { getCurrentAccount } from "@/lib/session"
import Link from "next/link"
import { redirect } from "next/navigation"
import Origin from "./components/Origin"

export const dynamic = 'force-dynamic'

export default async function Page({ params }) {
    const { workspaceId } = params
    const { accountId } = await getCurrentAccount()

    const workspace = await reptoid.account(accountId).workspace(workspaceId).get()
    
    let gitStatus = null
    try {
        gitStatus = await reptoid.account(accountId).workspace(workspaceId).git().status()
    } catch (e) {
    }
    let gitDiff = null
    let gitDiffCached = null
    if (gitStatus) {
        gitDiff = await reptoid.account(accountId).workspace(workspaceId).git().diff()
        gitDiffCached = await reptoid.account(accountId).workspace(workspaceId).git().diff({ cached: true })
    }

    async function initializeGit() {
        'use server'
        await reptoid.account(accountId).workspace(workspaceId).git().init()
        redirect(`/dashboard/workspaces/${workspaceId}`)
    }

    async function addAll() {
        'use server'
        await reptoid.account(accountId).workspace(workspaceId).git().addAll()
        redirect(`/dashboard/workspaces/${workspaceId}`)
    }

    async function commit() {
        'use server'
        await reptoid.account(accountId).workspace(workspaceId).git().commit({ message: 'New commit' })
        redirect(`/dashboard/workspaces/${workspaceId}`)
    }

    async function push() {
        'use server'
        await reptoid.account(accountId).workspace(workspaceId).git().push()
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
                        <div className="mt-2">
                            <Origin workspaceId={workspaceId} origin={workspace.origin}/>
                        </div>
                        <div className="mt-6">
                            <div className="inline-block">
                                <form action={addAll}>
                                    <button className="bg-black text-white px-3 py-2">Git Add All</button>
                                </form>
                            </div>
                            <div className="inline-block ml-4">
                                <form action={commit}>
                                    <button className="bg-black text-white px-3 py-2">Git Commit</button>
                                </form>
                            </div>
                            <div className="inline-block ml-4">
                                <form action={push}>
                                    <button className="bg-black text-white px-3 py-2">Push</button>
                                </form>
                            </div>
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
                        {
                            gitDiffCached
                                ? <div className="mt-6">
                                    <div className="text-xl font-bold">To be committed</div>
                                    <div>
                                        <pre>{gitDiffCached}</pre>
                                    </div>
                                </div>
                                : <></>
                        }
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