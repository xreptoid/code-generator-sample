'use client'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

export default function FolderFrame({ workspaceId, path, folderData }) {
    const [activeForm, setActiveForm] = useState(null)
    return <div>
        <div>
            <div className="inline-block">
                <NewFolder {...{workspaceId, path, activeForm, setActiveForm}}/>
            </div>
            <div className={cn("inline-block", !activeForm ? "ml-4" : "")}>
                <NewFile {...{workspaceId, path, activeForm, setActiveForm}}/>
            </div>
        </div>
        <div className="mt-6">
            {folderData.items.map(item => (
                <div key={`folder-item-${item.name}`}>
                    <Link
                        href={`/dashboard/workspaces/${workspaceId}/files/${path}/${item.name}`}
                    >
                        {item.name}
                    </Link>
                </div>
            ))}
        </div>
    </div>
}

function NewFolder({ workspaceId, path, activeForm, setActiveForm }) {
    const [name, setName] = useState('')

    const onCreateClick = e => {
        fetch('/api/files/create-folder', {
            method: 'POST',
            headers: {'Content-Type': 'appliaction/json'},
            body: JSON.stringify({
                workspaceId,
                filePath: `${path}/${name}`,
            })
        }).then(resp => resp.json())
        .then(({ result, reason, data }) => {
            if (result === 'ok') {
                window.location = ''
                return
            }
        })
    }

    if (!activeForm) {
        return <div>
            <button
                className="border border-gray-800 px-3 py-1.5 font-bold"
                onClick={e => { setName(''); setActiveForm('folder') }}
            >New Folder</button>
        </div>
    } else if (activeForm === 'folder') {
        return <div>
            <input type="text" className="border border-gray-500 px-3 py-1.5" placeholder="Name" onChange={e => setName(e.target.value)} value={name}/>
            <div className="mt-2">
                <button
                    className="bg-black text-white px-3 py-1.5 font-bold"
                    onClick={onCreateClick}
                >Create Folder</button>
                <button
                    className="ml-4 border border-gray-800 px-3 py-1.5"
                    onClick={e => { setName(''); setActiveForm(null) }}
                >Cancel</button>
            </div>
        </div>
    } else {
        return <></>
    }
}


function NewFile({ workspaceId, path, activeForm, setActiveForm }) {
    const [name, setName] = useState('')

    const onCreateClick = e => {
        fetch('/api/files', {
            method: 'POST',
            headers: {'Content-Type': 'appliaction/json'},
            body: JSON.stringify({
                workspaceId,
                filePath: `${path}/${name}`,
                content: ''
            })
        }).then(resp => resp.json())
        .then(({ result, reason, data }) => {
            if (result === 'ok') {
                window.location = ''
                return
            }
        })
    }

    if (!activeForm) {
        return <div>
            <button
                className="border border-gray-800 px-3 py-1.5 font-bold"
                onClick={e => { setName(''); setActiveForm('file') }}
            >New File</button>
        </div>
    } else if (activeForm === 'file') {
        return <div>
            <input type="text" className="border border-gray-500 px-3 py-1.5" placeholder="Name" onChange={e => setName(e.target.value)} value={name}/>
            <div className="mt-2">
                <button
                    className="bg-black text-white px-3 py-1.5 font-bold"
                    onClick={onCreateClick}
                >Create File</button>
                <button
                    className="ml-4 border border-gray-800 px-3 py-1.5"
                    onClick={e => { setName(''); setActiveForm(null) }}
                >Cancel</button>
            </div>
        </div>
    } else {
        return <></>
    }
}