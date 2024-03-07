import RandomAI from "./components/RandomAI"


export default async function Page({ params }) {
    const { workspaceId } = params
    return <div className="mt-10">
        <div>
            <RandomAI workspaceId={workspaceId}/>
        </div>
    </div>
}