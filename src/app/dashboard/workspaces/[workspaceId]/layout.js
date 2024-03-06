import Link from "next/link"

export default function Layout({ params, children }) {
    const { workspaceId } = params
    return <>
        <div className="text-3xl font-bold">Workspace: {workspaceId}</div>
        <div className="mt-6">
            <Link className="mr-6 text-lg hover:underline" href={`/dashboard/workspaces/${workspaceId}`}>Overview</Link>
            <Link className="mr-6 text-lg hover:underline" href={`/dashboard/workspaces/${workspaceId}/files`}>Files</Link>
        </div>
        <div>
            {children}
        </div>
    </>
}