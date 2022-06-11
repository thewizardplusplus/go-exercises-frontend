import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { Spin, Form, Input, Row, Col, Button, message } from 'antd'
import { Editor } from '../Editor/Editor.js'
import './TaskForm.css'

export function TaskForm() {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const authHeader = useAuthHeader()
  const [form] = Form.useForm()
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      if (id === undefined) {
        return
      }

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
        form.setFieldsValue({
          title: task.Title,
          description: task.Description,
          boilerplateCode: task.BoilerplateCode,
          testCases: JSON.stringify(task.TestCases),
        })
      } catch (exception) {
        message.error(exception.toString())
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const saveTask = async (data, handler) => {
    setLoading(true)

    try {
      const response = await fetch(`/api/v1/tasks/${id ?? ''}`, {
        method: id === undefined ? 'POST' : 'PUT',
        headers: {
          Authorization: authHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          testCases: JSON.parse(data.testCases),
        }),
      })
      if (!response.ok) {
        const errMessage = await response.text()
        throw new Error(errMessage)
      }

      let idForRedirection = id
      if (idForRedirection === undefined) {
        const task = await response.json()
        idForRedirection = task.ID
      }

      handler(idForRedirection)
    } catch (exception) {
      setLoading(false)
      message.error(exception.toString())
    }
  }
  return (
    <Spin spinning={loading}>
      <Form
        layout="vertical"
        form={form}
        onKeyDown={event => {
          // handle the "Ctrl+S" and "Cmd+S" combinations
          if (!(event.ctrlKey || event.metaKey) || event.code !== 'KeyS') {
            return
          }

          saveTask(form.getFieldsValue(), idForRedirection => {
            if (id === undefined) {
              history.push(`/tasks/${idForRedirection}/edit`)
            } else {
              setLoading(false)
            }
          })

          event.preventDefault()
        }}
        onFinish={async data => {
          await saveTask(data, idForRedirection => {
            history.push(`/tasks/${idForRedirection}`)
          })
        }}
      >
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Editor name="description" mode="markdown" />
        </Form.Item>

        <Form.Item label="Boilerplate code" name="boilerplateCode">
          <Editor name="boilerplateCode" mode="golang" />
        </Form.Item>

        <Form.Item label="Test cases" name="testCases">
          <Editor name="testCases" mode="json" />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col className="task-form-cancel-button-container" span={12}>
              <Button
                block
                onClick={() => {
                  history.push(id === undefined ? '/' : `/tasks/${id}`)
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col className="task-form-submit-button-container" span={12}>
              <Button type="primary" htmlType="submit" block>
                {id === undefined ? 'Create' : 'Save'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Spin>
  )
}
