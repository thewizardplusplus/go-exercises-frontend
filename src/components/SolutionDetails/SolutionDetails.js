import { Descriptions, Typography, Alert } from 'antd'

function reformatTimestamp(timestamp) {
  const parsedTimestamp = new Date(timestamp)
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  })
  return formatter.format(parsedTimestamp)
}

export function SolutionDetails(props) {
  return (
    <Descriptions column={1} bordered={true} size="small">
      <Descriptions.Item label="Created at">
        {reformatTimestamp(props.solution.CreatedAt)}
      </Descriptions.Item>

      <Descriptions.Item label="Updated at">
        {reformatTimestamp(props.solution.UpdatedAt)}
      </Descriptions.Item>

      {props.solution.Result.Input && (
        <Descriptions.Item
          label={<Typography.Text type="success">Input</Typography.Text>}
        >
          <Alert type="success" message={props.solution.Result.Input} />
        </Descriptions.Item>
      )}

      {props.solution.Result.ExpectedOutput && (
        <Descriptions.Item
          label={
            <Typography.Text type="success">Expected output</Typography.Text>
          }
        >
          <Alert
            type="success"
            message={props.solution.Result.ExpectedOutput}
          />
        </Descriptions.Item>
      )}

      {props.solution.Result.ActualOutput && (
        <Descriptions.Item
          label={<Typography.Text type="danger">Actual output</Typography.Text>}
        >
          <Alert type="error" message={props.solution.Result.ActualOutput} />
        </Descriptions.Item>
      )}

      {props.solution.Result.ErrMessage && (
        <Descriptions.Item
          label={<Typography.Text type="danger">Error message</Typography.Text>}
        >
          <Alert type="error" message={props.solution.Result.ErrMessage} />
        </Descriptions.Item>
      )}
    </Descriptions>
  )
}
