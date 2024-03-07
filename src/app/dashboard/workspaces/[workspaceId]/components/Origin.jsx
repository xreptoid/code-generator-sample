'use client'

import Image from "next/image"
import { useState } from "react"

export default function Origin({ workspaceId, origin }) {
    const [isActive, setIsActive] = useState(false)
    const [newPath, setNewPath] = useState(origin && origin.path || '')

    const onSetOriginClick = e => {
        e.preventDefault()
        setIsActive(true)
    }

    const onSetOriginSubmitClick = e => {
        e.preventDefault()
        fetch('/api/github/set-origin', {
            method: 'POST',
            headers: {'Content-Type': 'appliaction/json'},
            body: JSON.stringify({
                workspaceId,
                newPath,
            })
        }).then(resp => resp.json())
        .then(({ result }) => {
            if (result === 'ok') {
                window.location = ''
            }
        })
    }

    const onCreateInGithub = e => {
        e.preventDefault()
        fetch('/api/github/create', {
            method: 'POST',
            headers: {'Content-Type': 'appliaction/json'},
            body: JSON.stringify({
                repoPath: origin.path,
            })
        }).then(resp => resp.json())
        .then(({ result }) => {
            if (result === 'ok') {
                window.location = ''
            }
        })
    }

    if (isActive) {
        return <div>
            <input
                className="p-2 border border-gray-600"
                type="text"
                value={newPath}
                onChange={e => setNewPath(e.target.value)}
                placeholder="GitHub path"
            />
            <button className="bg-black text-white font-bold px-3 py-2 ml-2" onClick={onSetOriginSubmitClick}>Set Origin</button>
        </div>
    }
    
    if (origin) {
        return <div>
            Origin:
            <Image className="inline-block ml-2" src="/github-mark.svg" width={16} height={16} alt=""/>
            <a
                href={`https://github.com/${origin.path}`}
                className="font-bold hover:underline ml-0.5"
                target="_blank"
            >{origin.path}</a>
            <button className="border border-gray-600 px-2 py-1 text-sm ml-4" onClick={onSetOriginClick}>
                Update
            </button>
            <button className="bg-black text-white font-bold px-2 py-1 ml-4" onClick={onCreateInGithub}>
                <Image className="inline-block mr-2" src="/github-mark-white.svg" width={18} height={18} alt=""/>
                Create in GitHub
            </button>
        </div>
    }
    return <div>
        <button className="bg-black text-white px-2 py-1 text-sm" onClick={onSetOriginClick}>
            <Image className="inline-block mr-2" src="/github-mark-white.svg" width={18} height={18} alt=""/>
            Set Origin
        </button>
    </div>
}