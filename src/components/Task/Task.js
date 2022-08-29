import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useJSONDataFetchingWithAuthAndErrorHandling } from '../../hooks/hooks.js'
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
  const { loading, fetchJSONData } =
    useJSONDataFetchingWithAuthAndErrorHandling()
  const { loading: statusLoading, fetchJSONData: fetchStatusJSONData } =
    useJSONDataFetchingWithAuthAndErrorHandling()
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

  const updateURL = (activeTab, taskID, solutionID) => {
    const url =
      activeTab === '1'
        ? `/tasks/${taskID}`
        : solutionID !== undefined
        ? `/tasks/${taskID}/solutions/${solutionID}`
        : `/tasks/${taskID}/solutions`
    window.history.replaceState(null, '', url)
    setSolutionID(solutionID)
  }
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
              setActiveTab(activeKey)
              updateURL(activeKey, id)
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
                  window.scroll(0, 0)
                  updateURL('2', id, solution.ID)
                }}
                onReturningToAllSolutions={() => {
                  updateURL('2', id)
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
              setActiveTab('2')
              updateURL('2', id)
            }}
          />
        </Col>
      </Row>
    </Card>
  )
}
