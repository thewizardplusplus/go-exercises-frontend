import { Alert } from 'antd'
import { TestCaseNote } from '../TestCaseNote/TestCaseNote.js'
import './TestCase.css'

export function TestCase(props) {
  const message = !props.message ? (
    <TestCaseNote message="empty" />
  ) : typeof props.message === 'string' && props.message.slice(-1) === '\n' ? (
    <>
      {props.message.slice(0, -1)}
      <TestCaseNote message="line break" />
    </>
  ) : (
    props.message
  )

  return (
    <Alert
      className="test-case-alert"
      type={props.type}
      message={
        props.preformatted ? (
          <pre>
            <code>{message}</code>
          </pre>
        ) : (
          message
        )
      }
    />
  )
}
