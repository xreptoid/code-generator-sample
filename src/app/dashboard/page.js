import Reptoid from "@reptoid/codebases"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import ImportRepoForm from "./components/ImportRepoForm"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'

const reptoid = new Reptoid({
    apiHost: 'http://localhost:3010',
    accessToken: process.env.REPTOID_ACCESS_TOKEN
})

export default async function Page() {
    const accountId = '230145c4-69c6-4f49-a4c2-0d1c6ba993a3'
    const repos = await reptoid.account(accountId).github().repos()
    const workspaces = await reptoid.account(accountId).workspaces().all()

    async function create(formData) {
        'use server'
        await reptoid.account(accountId).workspaces().create()
        redirect('/dashboard')
    }

    return <div className="p-20">
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