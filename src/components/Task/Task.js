import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthHeader, useAuthUser } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import {
  Form,
  Card,
  Space,
  Tooltip,
  Button,
  Row,
  Col,
  Tabs,
  message,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { TaskDetails } from '../TaskDetails/TaskDetails.js'
import { SolutionGroup } from '../SolutionGroup/SolutionGroup.js'
import { SolutionForm } from '../SolutionForm/SolutionForm.js'
import './Task.css'

export function Task() {
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState(null)
  const [activeTab, setActiveTab] = useState('1')
  const { id } = useParams()
  const authHeader = useAuthHeader()
  const auth = useAuthUser()
  const history = useHistory()
  const [solutionForm] = Form.useForm()

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
      extra={
        auth().ID === task?.UserID && (
          <Space>
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
          </Space>
        )
      }
    >
      <Card.Meta
        title={`#${id} ${task?.Title}`}
        description={task && <TaskDetails task={task} />}
      />
      <Row>
        <Col span={12}>
          <Tabs
            activeKey={activeTab}
            onChange={activeKey => {
              setActiveTab(activeKey)
            }}
          >
            <Tabs.TabPane key="1" tab="Description">
              {task?.Description}
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="Solutions">
              <SolutionGroup
                taskID={id}
                onSolutionSelection={solution => {
                  solutionForm.setFieldsValue({ code: solution.Code })
                  window.scroll(0, 0)
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
        <Col span={12}>
          <SolutionForm
            taskID={id}
            boilerplateCode={task?.BoilerplateCode}
            form={solutionForm}
            onSolutionSubmission={() => {
              setActiveTab('2')
            }}
          />
        </Col>
      </Row>
    </Card>
  )
}
