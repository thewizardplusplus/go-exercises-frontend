import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthHeader, useAuthUser } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { Card, Tooltip, Button, message } from 'antd'
import { TaskDetails } from '../TaskDetails/TaskDetails.js'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export function Task() {
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState(null)
  const { id } = useParams()
  const authHeader = useAuthHeader()
  const auth = useAuthUser()
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
          {task && <TaskDetails task={task} />}
        </>
      }
      extra={
        auth().ID === task?.UserID && (
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
        )
      }
    >
      <p>{task?.Description}</p>
    </Card>
  )
}
