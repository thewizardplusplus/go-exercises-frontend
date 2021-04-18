import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { List, Descriptions, message } from 'antd'
import { Link } from 'react-router-dom'

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

export function TaskGroup() {
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const authHeader = useAuthHeader()

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      try {
        const response = await fetch('/api/v1/tasks/', {
          method: 'GET',
          headers: { Authorization: authHeader() },
        })
        if (!response.ok) {
          const errMessage = await response.text()
          throw new Error(errMessage)
        }

        const tasks = await response.json()
        setTasks(tasks)
      } catch (exception) {
        message.error(exception.toString())
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <List
      loading={loading}
      dataSource={tasks}
      rowKey="ID"
      renderItem={task => (
        <List.Item>
          <List.Item.Meta
            title={
              <Link
                to={`/tasks/${task.ID}`}
              >{`#${task.ID} ${task.Title}`}</Link>
            }
            description={
              <Descriptions column={1}>
                <Descriptions.Item label="Created at">
                  {reformatTimestamp(task.CreatedAt)}
                </Descriptions.Item>
                <Descriptions.Item label="Updated at">
                  {reformatTimestamp(task.UpdatedAt)}
                </Descriptions.Item>
              </Descriptions>
            }
          />
        </List.Item>
      )}
    />
  )
}
