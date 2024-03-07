'use client'
import Link from "next/link"
import { useState } from "react"

export default function RandomAI({ workspaceId }) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [newFilePath, setNewFilePath] = useState('')

    const onGenerateClick = e => {
        e.preventDefault()
        setIsGenerating(true)
        fetch('/api/ai/generate-random-file', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                workspaceId,
            })
        })
        .then(resp => resp.json())
        .then(({result, data}) => {
            if (result === 'ok') {
                setNewFilePath(data.newFilePath)
                setIsGenerating(false)
            }
        })
    }

    if (isGenerating) {
        return <div className="font-bold">Generating a random file using gpt-3.5-turbo...</div>
    }
    if (newFilePath) {
        return <div>
            <div>File is generated:</div>
            <div>
                <Link href={`/dashboard/workspaces/${workspaceId}/files/${newFilePath}`} className="underline font-bold">/{newFilePath}</Link>
            </div>
        </div>
    }
    return <div>
        <button
            className="border-2 border-blue-900 text-blue-900 text-lg font-bold px-4 py-3"
            onClick={onGenerateClick}
        >Generate random file with AI</button>
    </div>
}

