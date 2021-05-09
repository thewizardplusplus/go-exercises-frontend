import { Avatar, Typography } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import './StatusSign.css'

export function StatusSign(props) {
  return (
    <Avatar
      className="status-sign-avatar"
      icon={
        props.status === 'success' ? (
          // success
          <Typography.Text type="success">
            <CheckOutlined />
          </Typography.Text>
        ) : props.status === 'failure' ? (
          // failure
          <Typography.Text type="danger">
            <CloseOutlined />
          </Typography.Text>
        ) : (
          // unknown
          <QuestionOutlined />
        )
      }
    />
  )
}
