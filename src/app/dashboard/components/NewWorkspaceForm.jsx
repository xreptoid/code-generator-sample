'use client'
import { useState } from "react"

export default function NewWorkspaceForm({ }) {
    const [isActive, setIsActive] = useState('')
    const [name, setName] = useState('')

    const onCreateClick = e => {
        fetch('/api/workspaces/create', {
            method: 'POST',
            headers: {'Content-Type': 'appliaction/json'},
            body: JSON.stringify({
                name,
            })
        }).then(resp => resp.json())
        .then(({ result, reason, data }) => {
            if (result === 'ok') {
                window.location = ''
                return
            }
        })
    }

    if (!isActive) {
        return <div>
            <button
                className="bg-black text-white px-3 py-1.5"
                onClick={e => { setName(''); setIsActive(true) }}
            >+ New</button>
        </div>
    } else {
        return <div>
            <input type="text" className="border border-gray-500 px-3 py-1.5" placeholder="Name" onChange={e => setName(e.target.value)} value={name}/>
            <div className="mt-2">
                <button
                    className="bg-black text-white px-3 py-1.5 font-bold"
                    onClick={onCreateClick}
                >Create</button>
                <button
                    className="ml-4 border border-gray-800 px-3 py-1.5"
                    onClick={e => { setName(''); setIsActive(false) }}
                >Cancel</button>
            </div>
        </div>
    }
}
