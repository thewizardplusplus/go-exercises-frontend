import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useJSONDataFetchingWithAuth } from '../../hooks/hooks.js'
import { useAuthUser } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { Card, Space, Tooltip, Button, Spin, Row, Col, Tabs } from 'antd'
import { StatusSign } from '../StatusSign/StatusSign.js'
import { ItemDetails } from '../ItemDetails/ItemDetails.js'
import { Markdown } from '../Markdown/Markdown.js'
import { SolutionGroup } from '../SolutionGroup/SolutionGroup.js'
import { SolutionForm } from '../SolutionForm/SolutionForm.js'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './Task.css'

export function Task(props) {
  const { id, solutionID: defaultSolutionID } = useParams()
  const [solutionID, setSolutionID] = useState(
    parseInt(defaultSolutionID, 10) || undefined,
  )
  const { loading, fetchJSONData } = useJSONDataFetchingWithAuth()
  const {
    loading: statusLoading,
    fetchJSONData: fetchStatusJSONData,
  } = useJSONDataFetchingWithAuth()
  const [task, setTask] = useState(null)
  const [taskStatus, setTaskStatus] = useState(null)
  const authUser = useAuthUser()
  const history = useHistory()
  const [activeTab, setActiveTab] = useState(
    !props.solutionGroupMode ? '1' : '2',
  )

  const loadTask = async (id, loader, handler) => {
    await loader('GET', `/api/v1/tasks/${id}`, {
      onLoadingSuccess: task => {
        handler(task)
      },
    })
  }
  useEffect(() => {
    loadTask(id, fetchJSONData, task => {
      setTask(task)
      setTaskStatus(task.Status)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      loading={loading}
      extra={
        authUser().ID === task?.UserID && (
          <Space>
            <Tooltip title="Edit">
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  history.push(`/tasks/${id}/edit`)
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                icon={<DeleteOutlined />}
                onClick={async () => {
                  await fetchJSONData('DELETE', `/api/v1/tasks/${id}`, {
                    onLoadingSuccess: () => {
                      history.push('/')
                      return false // finishing not required
                    },
                  })
                }}
              />
            </Tooltip>
          </Space>
        )
      }
    >
      <Card.Meta
        avatar={
          <Spin spinning={statusLoading}>
            <StatusSign statusCode={taskStatus} />
          </Spin>
        }
        title={`#${id} ${task?.Title}`}
        description={task && <ItemDetails item={task} />}
      />
      <Row>
        <Col span={12}>
          <Tabs
            activeKey={activeTab}
            destroyInactiveTabPane={true}
            onChange={activeKey => {
              const url =
                activeKey === '1' ? `/tasks/${id}` : `/tasks/${id}/solutions`
              window.history.replaceState(null, '', url)
              setSolutionID(undefined)

              setActiveTab(activeKey)
            }}
          >
            <Tabs.TabPane key="1" tab="Description">
              <Markdown content={task?.Description} />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="Solutions">
              <SolutionGroup
                taskID={id}
                solutionID={solutionID}
                onSolutionUpdate={() => {
                  loadTask(id, fetchStatusJSONData, task => {
                    setTaskStatus(task.Status)
                  })
                }}
                onSolutionSelection={solution => {
                  const url = `/tasks/${id}/solutions/${solution.ID}`
                  window.history.replaceState(null, '', url)
                  setSolutionID(solution.ID)

                  window.scroll(0, 0)
                }}
                onReturningToAllSolutions={() => {
                  const url = `/tasks/${id}/solutions`
                  window.history.replaceState(null, '', url)
                  setSolutionID(undefined)
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
        <Col span={12}>
          <SolutionForm
            taskID={id}
            solutionID={solutionID}
            boilerplateCode={task?.BoilerplateCode}
            onSolutionSubmission={() => {
              const url = `/tasks/${id}/solutions`
              window.history.replaceState(null, '', url)
              setSolutionID(undefined)

              setActiveTab('2')
            }}
          />
        </Col>
      </Row>
    </Card>
  )
}
