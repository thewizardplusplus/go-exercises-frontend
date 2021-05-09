import { Descriptions } from 'antd'
import './TaskDetails.css'

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
    <Descriptions
      className="task-details-descriptions"
      column={1}
      bordered={true}
      size="small"
    >
      <Descriptions.Item label="Created at">
        {reformatTimestamp(props.task.CreatedAt)}
      </Descriptions.Item>
      <Descriptions.Item label="Updated at">
        {reformatTimestamp(props.task.UpdatedAt)}
      </Descriptions.Item>
      <Descriptions.Item label="Author">
        {props.task.User.Username}
      </Descriptions.Item>
    </Descriptions>
  )
}
