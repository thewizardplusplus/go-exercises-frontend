import { Descriptions } from 'antd'

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

export function TaskDetails(props) {
  return (
    <Descriptions column={1} bordered={true} size="small">
      <Descriptions.Item label="Created at">
        {reformatTimestamp(props.task.CreatedAt)}
      </Descriptions.Item>
      <Descriptions.Item label="Updated at">
        {reformatTimestamp(props.task.UpdatedAt)}
      </Descriptions.Item>
    </Descriptions>
  )
}