import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { List, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { StatusSign } from '../StatusSign/StatusSign.js'
import { ItemDetails } from '../ItemDetails/ItemDetails.js'
import './TaskGroup.css'

export function TaskGroup() {
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const authHeader = useAuthHeader()

  const pageSize = 5
  const loadTasks = async page => {
    setLoading(true)

    try {
      const response = await fetch(
        `/api/v1/tasks/?pageSize=${pageSize}&page=${page}`,
        {
          method: 'GET',
          headers: { Authorization: authHeader() },
        },
      )
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
  }
  useEffect(() => {
    loadTasks(1)
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
                <StatusSign
                  status={
                    task.Status === 2
                      ? 'success'
                      : task.Status === 1
                      ? 'failure'
                      : 'unknown'
                  }
                />
              }
              title={
                <Link
                  to={`/tasks/${task.ID}`}
                >{`#${task.ID} ${task.Title}`}</Link>
              }
              description={<ItemDetails item={task} />}
            />
          </List.Item>
        )}
        pagination={{
          total: Number.POSITIVE_INFINITY,
          showSizeChanger: false,
          onChange: page => {
            loadTasks(page)
          },
        }}
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
