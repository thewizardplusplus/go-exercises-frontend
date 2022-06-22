import { Avatar, Typography } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import './StatusSign.css'

export function StatusSign(props) {
  const statusName =
    props.statusName ??
    (props.statusCode === 2
      ? 'success'
      : props.statusCode === 1
      ? 'failure'
      : 'unknown')
  return (
    <Avatar
      className="status-sign-avatar"
      icon={
        statusName === 'success' ? (
          <Typography.Text type="success">
            <CheckOutlined />
          </Typography.Text>
        ) : statusName === 'failure' ? (
          <Typography.Text type="danger">
            <CloseOutlined />
          </Typography.Text>
        ) : (
          // unknown status
          <QuestionOutlined />
        )
      }
    />
  )
}
