import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { Spin, Form, Input, Button, message } from 'antd'

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
          testCases: task.TestCases,
        })
      } catch (exception) {
        message.error(exception.toString())
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Spin spinning={loading}>
      <Form
        layout="vertical"
        form={form}
        onFinish={async data => {
          setLoading(true)

          try {
            const response = await fetch(`/api/v1/tasks/${id ?? ''}`, {
              method: id === undefined ? 'POST' : 'PUT',
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

            let idForRedirection = id
            if (idForRedirection === undefined) {
              const task = await response.json()
              idForRedirection = task.ID
            }

            history.push(`/tasks/${idForRedirection}`)
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
            {id === undefined ? 'Create' : 'Save'} task
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
