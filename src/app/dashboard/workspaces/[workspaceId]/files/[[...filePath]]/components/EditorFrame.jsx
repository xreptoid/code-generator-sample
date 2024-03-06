'use client'

import { useEffect, useRef, useState } from "react";
import Editor from "./Editor";

export default function EditorFrame(props) {
  const { fileData, filePath, frameworks, gitData } = props
  const { isFile, exists } = fileData

  const [editorContent, setEditorContent] = useState(fileData.content)
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingUploading, setIsSavingUploading] = useState(false);
  const onEditorSave = async () => {
    const newEditorContent = editorContent
    await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filePath, content: newEditorContent })
    }).then(resp => {
      //window.location = ''
    })
    if (newEditorContent !== editorContent) {
      setIsSaving(true)
    }
  }

  useEffect(() => {
    if (isSaving) {
      const timeoutId = setTimeout(async () => {
        setIsSavingUploading(true)
        setIsSaving(false);
        await onEditorSave()
        setIsSavingUploading(false)
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [editorContent, isSaving]);

  const handleContentChange = newContent => {
    setEditorContent(newContent);
    setIsSaving(true);
  };

  const ref = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.height = `${window.innerHeight - rect.top - 20}px`;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        setIsSaving(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    const body = document.getElementsByTagName('body')[0]
    const htmlOld = html.style.overscrollBehaviorX
    html.style.overscrollBehavior = 'none'
    const bodyOld = body.style.overscrollBehaviorX
    body.style.overscrollBehavior = 'none'
    return () => {
      html.style.overscrollBehaviorX = htmlOld
      body.style.overscrollBehaviorX = bodyOld
    };
  }, []);

  const renderEditor = () => {
    return <div>
      <div ref={ref} style={{ width: '100%' }}>
        <Editor defaultContent={editorContent} onChange={handleContentChange}/>
      </div>
    </div>
  }

  const renderIsNew = () => {
    if (!exists) {
      return <h3>[NEW]</h3>
    }
    return <></>
  }

  const renderBody = () => {
    if (exists && !isFile) {
      return <h3>is folder</h3>
    }
    return <div>
      <div>
        {isSaving ? 'saving...' : ''}
      </div>
      {renderEditor()}
    </div>
  }

  return <>
    <div className="">
      <div>
      </div>
      <div>
        {renderBody()}
      </div>
    </div>
  </>
}
  //<PathNav projectName={projectName} path={filePath} isFile={isFile}/>