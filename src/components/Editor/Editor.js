import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/mode-golang'
import 'ace-builds/src-noconflict/theme-monokai'

export function Editor(props) {
  return (
    <AceEditor
      theme="monokai"
      width={'100%'}
      minLines={5}
      maxLines={Number.POSITIVE_INFINITY}
      fontSize={16}
      tabSize={2}
      wrapEnabled={true}
      setOptions={{ showInvisibles: true, indentedSoftWrap: false }}
      {...props}
    />
  )
}
