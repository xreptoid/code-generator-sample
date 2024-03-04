import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/ext-language_tools";


export default function Editor({ defaultContent, content, onChange }) {
  return <AceEditor
    mode="jsx"
    //theme="github"
    onChange={onChange}
    name="file-editor"
    //editorProps={{ $blockScrolling: true }}
    defaultValue={defaultContent}
    value={content}
    fontSize={'13pt'}
    tabSize={2}
    style={{ width: '100%', height: '100%', lineHeight: '18pt', fontFamily: 'Ubuntu Mono' }}
  />
}