import Reptoid from "@reptoid/codebases"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

const reptoid = new Reptoid({ accessToken: process.env.REPTOID_ACCESS_TOKEN })

export default async function Page() {
    const accountId = '230145c4-69c6-4f49-a4c2-0d1c6ba993a3'
    const workspaces = await reptoid.account(accountId).workspaces().all()

    async function create(formData) {
        'use server'
        await reptoid.account(accountId).workspaces().create()
        redirect('/dashboard')
    }

    return <div className="p-20">
        <div className="text-xl font-bold">Workspaces</div>
        <div className="mt-4">
            <form action={create}>
                <button className="bg-black font-bold text-white px-3 py-2">Create New</button>
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