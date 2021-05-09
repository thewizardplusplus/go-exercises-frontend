import { Descriptions } from 'antd'
import './ItemDetails.css'

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

export function ItemDetails(props) {
  return (
    <Descriptions
      className="item-details-descriptions"
      column={1}
      bordered={true}
      size="small"
    >
      <Descriptions.Item label="Created at">
        {reformatTimestamp(props.item.CreatedAt)}
      </Descriptions.Item>

      <Descriptions.Item label="Updated at">
        {reformatTimestamp(props.item.UpdatedAt)}
      </Descriptions.Item>

      <Descriptions.Item label="Author">
        {props.item.User.Username}
      </Descriptions.Item>

      {props.additionDetails}
    </Descriptions>
  )
}
