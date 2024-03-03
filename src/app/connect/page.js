import Reptoid from "@/lib/manager"
// import Reptoid from '@reptoid/codebases'

export default async function Page() {
    const reptoid = new Reptoid({ accessToken: '123' })

    const userId = '456'
    
    const repos = await reptoid.user(userId).github.getRepositories()

    return <div className="p-20">
        <div className="text-xl font-bold">available repos:</div>
        <div>
            {repos.map(repo => (
                <div key={`repo-${repo}`} className="my-2">
                    {repo}
                </div>
            ))}
        </div>
    </div>
}