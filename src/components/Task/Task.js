import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { Card, Descriptions, Tooltip, Button, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

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

export function Task() {
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState(null)
  const { id } = useParams()
  const authHeader = useAuthHeader()
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      try {
        const response = await fetch(`/api/v1/tasks/${id}`, {
          method: 'GET',
          headers: { Authorization: authHeader() },
        })
        if (!response.ok) {
          const errMessage = await response.text()
          throw new Error(errMessage)
        }

        const task = await response.json()
        setTask(task)
      } catch (exception) {
        message.error(exception.toString())
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      loading={loading}
      title={
        <>
          <p>{task?.Title}</p>
          <Descriptions column={1}>
            <Descriptions.Item label="Created at">
              {task && reformatTimestamp(task.CreatedAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Updated at">
              {task && reformatTimestamp(task.UpdatedAt)}
            </Descriptions.Item>
          </Descriptions>
        </>
      }
      extra={
        <>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => history.push(`/tasks/${id}/edit`)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={async () => {
                setLoading(true)

                try {
                  const response = await fetch(`/api/v1/tasks/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: authHeader() },
                  })
                  if (!response.ok) {
                    const errMessage = await response.text()
                    throw new Error(errMessage)
                  }

                  history.push('/')
                } catch (exception) {
                  setLoading(false)
                  message.error(exception.toString())
                }
              }}
            />
          </Tooltip>
        </>
      }
    >
      <p>{task?.Description}</p>
    </Card>
  )
}
