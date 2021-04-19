import { useState } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { Spin, Form, Input, Button, message } from 'antd'

export function TaskForm() {
  const [loading, setLoading] = useState(false)
  const authHeader = useAuthHeader()
  const history = useHistory()

  return (
    <Spin spinning={loading}>
      <Form
        layout="vertical"
        onFinish={async data => {
          setLoading(true)

          try {
            const response = await fetch('/api/v1/tasks/', {
              method: 'POST',
              headers: {
                Authorization: authHeader(),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            if (!response.ok) {
              const errMessage = await response.text()
              throw new Error(errMessage)
            }

            const task = await response.json()
            history.push(`/tasks/${task.ID}`)
          } catch (exception) {
            setLoading(false)
            message.error(exception.toString())
          }
        }}
      >
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Boilerplate code" name="boilerplateCode">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Test cases" name="testCases">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create task
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
