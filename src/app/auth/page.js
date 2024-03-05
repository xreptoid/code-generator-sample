import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import Image from "next/image"


export default async function Page({ searchParams }) {
    const { err } = searchParams
    return <>
        <main className="min-h-screen text-center">
            <div className="inline-block pt-32">
                <AuthError err={err}/>
                <div className="text-3xl font-bold">
                    Auth with:
                </div>
                <div className="mt-10">
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
        </main>
    </>
}

const AuthError = ({ err }) => {
    if (!err) {
        return <></>
    }
    if (err === 'bad-code') {
        return <div className="bg-red-700 text-white p-5">
            GitHub sent inalid code
        </div>
    }
    return <div className="bg-red-700 text-white p-5">
        Unkown error
    </div>
}