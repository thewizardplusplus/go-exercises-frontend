import { useJSONDataFetchingWithAuth } from '../../hooks/hooks.js'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { List, Button } from 'antd'
import { StatusSign } from '../StatusSign/StatusSign.js'
import { Link } from 'react-router-dom'
import { ItemDetails } from '../ItemDetails/ItemDetails.js'
import './TaskGroup.css'

const pageSize = 5

export function TaskGroup() {
  const { loading, fetchJSONData } = useJSONDataFetchingWithAuth()
  const [tasks, setTasks] = useState({ Tasks: [], TotalCount: 0 })
  const { page: defaultPage } = useParams()
  const [page, setPage] = useState(parseInt(defaultPage, 10) || 1)
  const history = useHistory()

  const loadTasks = async page => {
    const url = `/api/v1/tasks/?pageSize=${pageSize}&page=${page}`
    await fetchJSONData('GET', url, {
      onLoadingSuccess: tasks => {
        setTasks(tasks)
        setPage(page)
      },
    })
  }
  useEffect(() => {
    loadTasks(page)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <List
        className="task-group"
        bordered={true}
        loading={loading}
        dataSource={tasks.Tasks}
        rowKey="ID"
        renderItem={task => (
          <List.Item>
            <List.Item.Meta
              avatar={<StatusSign statusCode={task.Status} />}
              title={
                <Link to={`/tasks/${task.ID}`}>
                  {`#${task.ID} ${task.Title}`}
                </Link>
              }
              description={<ItemDetails item={task} />}
            />
          </List.Item>
        )}
        pagination={{
          current: page,
          total: tasks.TotalCount,
          pageSize,
          showSizeChanger: false,

          onChange: page => {
            const url = page !== 1 ? `/page/${page}` : '/'
            window.history.replaceState(null, '', url)

            loadTasks(page)
          },
        }}
      />
      <Button
        className="task-group-new-task-button"
        type="primary"
        block
        onClick={() => {
          history.push('/tasks/new')
        }}
      >
        New task
      </Button>
    </>
  )
}
