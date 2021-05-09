import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { List, Avatar, Typography, Button, message } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { TaskDetails } from '../TaskDetails/TaskDetails.js'
import './TaskGroup.css'

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
        className="task-group"
        bordered={true}
        loading={loading}
        dataSource={tasks}
        rowKey="ID"
        renderItem={task => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  className="task-group-task-avatar"
                  icon={
                    task.Status === 2 ? (
                      // solved
                      <Typography.Text type="success">
                        <CheckOutlined />
                      </Typography.Text>
                    ) : task.Status === 1 ? (
                      // not solved
                      <Typography.Text type="danger">
                        <CloseOutlined />
                      </Typography.Text>
                    ) : (
                      // no solutions
                      <QuestionOutlined />
                    )
                  }
                />
              }
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
      <Button
        className="task-group-new-task-button"
        type="primary"
        block
        onClick={() => history.push('/tasks/new')}
      >
        New task
      </Button>
    </>
  )
}
