import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import ImportRepoForm from "./components/ImportRepoForm"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import reptoid from "@/lib/reptoid"
import { getCurrentAccount } from "@/lib/session"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function Page() {
    const { accountId, email } = await getCurrentAccount()
    const repos = await reptoid.account(accountId).github().repos()
    const workspaces = await reptoid.account(accountId).workspaces().all()

    async function create(formData) {
        'use server'
        await reptoid.account(accountId).workspaces().create()
        redirect('/dashboard')
    }

    async function remove(formData) {
        'use server'
        await reptoid.account(accountId).workspace(formData.get('workspaceId')).remove()
        redirect('/dashboard')
    }

    return <div>
        <div className={cn("text-xl font-bold")}>Import GitHub repository</div>
        <div className="mt-4">
            <a
                href="https://github.com/apps/crossbow-local2/installations/select_target"
                target="_blank"
                className="underline text-blue-900 mb-4"
            >Add permissions</a>
            <ImportRepoForm repos={repos.map(repo => ({ label: repo, value: repo }))}/>
        </div>
        <div className="text-xl font-bold mt-10">Workspaces</div>
        <div className="mt-4">
            <form action={create}>
                <Button>Create New</Button>
            </form>
        </div>
        <div className="mt-6">
            {workspaces.map(workspace => (
                <div key={`ws-${workspace.workspaceId}`} className="my-4 border border-gray-200 p-3">
                    <div className="flex">
                        <div className="flex-auto">
                            <Link
                                href={`/dashboard/workspaces/${workspace.workspaceId}`}
                                className="hover:underline"
                            >
                                {workspace.workspaceId}
                            </Link>
                        </div>
                        <form action={remove}>
                            <input type="hidden" name="workspaceId" value={workspace.workspaceId}/>
                            <button>remove</button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    </div>
}