import './TestCaseNote.css'

export function TestCaseNote(props) {
  return <span className="test-case-note">{`<${props.message}>`}</span>
}
