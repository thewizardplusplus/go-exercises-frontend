import { Alert } from 'antd'
import './TestCase.css'

export function TestCase(props) {
  return (
    <Alert
      className="test-case-alert"
      type={props.type}
      message={
        props.preformatted ? (
          <pre>
            <code>{props.message}</code>
          </pre>
        ) : (
          props.message
        )
      }
    />
  )
}
