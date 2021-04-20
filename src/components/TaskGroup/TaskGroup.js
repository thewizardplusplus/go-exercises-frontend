import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { Button, List, message } from 'antd'
import { Link } from 'react-router-dom'
import { TaskDetails } from '../TaskDetails/TaskDetails.js'

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

  const history = useHistory()
  return (
    <>
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
              description={<TaskDetails task={task} />}
            />
          </List.Item>
        )}
      />
      <Button type="primary" block onClick={() => history.push('/tasks/new')}>
        New task
      </Button>
    </>
  )
}
