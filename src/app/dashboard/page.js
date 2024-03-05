import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import ImportRepoForm from "./components/ImportRepoForm"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import reptoid from "@/lib/reptoid"
import { getCurrentAccountId } from "@/lib/session"

export const dynamic = 'force-dynamic'

export default async function Page() {
    const accountId = await getCurrentAccountId()
    const repos = await reptoid.account(accountId).github().repos()
    const workspaces = await reptoid.account(accountId).workspaces().all()

    async function create(formData) {
        'use server'
        await reptoid.account(accountId).workspaces().create()
        redirect('/dashboard')
    }

    return <div className="p-20">
        <div>
            <div className="my-10">
                    <a
                        className="border-2 border-black hover:border-slate-500 rounded px-6 py-4"
                        href={`https://github.com/login/oauth/authorize?client_id=Iv1.a2c320658203d1e8`}
                    >
                        <Image className="inline-block" src="/github-mark.svg" width={32} height={32} alt=""/>
                        <div className="inline-block align-middle ml-2 text-lg font-bold">
                            Sign In using GitHub
                        </div>
                    </a>
                </div>
        </div>
        <div className={cn("text-xl font-bold")}>Import GitHub repository</div>
        <div className="mt-4">
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
                    {workspace.workspaceId}
                </div>
            ))}
        </div>
    </div>
}