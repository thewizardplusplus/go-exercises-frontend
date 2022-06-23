import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useJsonDataFetchingWithAuth } from '../../hooks/hooks.js'
import { List, Button } from 'antd'
import { Link } from 'react-router-dom'
import { StatusSign } from '../StatusSign/StatusSign.js'
import { ItemDetails } from '../ItemDetails/ItemDetails.js'
import './TaskGroup.css'

export function TaskGroup() {
  const { loading, fetchJsonData } = useJsonDataFetchingWithAuth()
  const [tasks, setTasks] = useState({ Tasks: [], TotalCount: 0 })
  const { page: defaultPage } = useParams()
  const [page, setPage] = useState(parseInt(defaultPage, 10) || 1)

  const pageSize = 5
  const loadTasks = async page => {
    const url = `/api/v1/tasks/?pageSize=${pageSize}&page=${page}`
    await fetchJsonData('GET', url, {
      onLoadingSuccess: tasks => {
        setTasks(tasks)
        setPage(page)
      },
    })
  }
  useEffect(() => {
    loadTasks(page)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()
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
