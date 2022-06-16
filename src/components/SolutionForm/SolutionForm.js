import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { Spin, Form, Row, Col, Button, message } from 'antd'
import { Editor } from '../Editor/Editor.js'
import './SolutionForm.css'

export function SolutionForm(props) {
  const [loading, setLoading] = useState(false)
  const authHeader = useAuthHeader()
  const [form] = Form.useForm()

  useEffect(() => {
    ;(async () => {
      if (props.solutionID === undefined) {
        form.resetFields()
        return
      }

      setLoading(true)

      try {
        const response = await fetch(`/api/v1/solutions/${props.solutionID}`, {
          method: 'GET',
          headers: { Authorization: authHeader() },
        })
        if (!response.ok) {
          const errMessage = await response.text()
          throw new Error(errMessage)
        }

        const solution = await response.json()
        form.setFieldsValue({ code: solution.Code })
      } catch (exception) {
        message.error(exception.toString())
      } finally {
        setLoading(false)
      }
    })()
  }, [props.solutionID]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Spin spinning={loading}>
      <Form
        className="solution-form"
        initialValues={{ code: props.boilerplateCode }}
        form={form}
        onFinish={async data => {
          setLoading(true)

          try {
            const response = await fetch(
              `/api/v1/tasks/${props.taskID}/solutions/`,
              {
                method: 'POST',
                headers: {
                  Authorization: authHeader(),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              },
            )
            if (!response.ok) {
              const errMessage = await response.text()
              throw new Error(errMessage)
            }

            props.onSolutionSubmission()
            message.success('Solution submitted')
          } catch (exception) {
            message.error(exception.toString())
          } finally {
            setLoading(false)
          }
        }}
      >
        <Form.Item name="code">
          <Editor
            name="code"
            mode="golang"
            commands={[
              {
                name: 'format',
                bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
                exec: async editor => {
                  setLoading(true)

                  try {
                    const response = await fetch('/api/v1/solutions/format', {
                      method: 'POST',
                      headers: {
                        Authorization: authHeader(),
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(form.getFieldsValue()),
                    })
                    if (!response.ok) {
                      const errMessage = await response.text()
                      throw new Error(errMessage)
                    }

                    const solution = await response.json()
                    form.setFieldsValue({ code: solution.Code })
                  } catch (exception) {
                    message.error(exception.toString())
                  } finally {
                    setLoading(false)
                  }
                },
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col className="solution-form-reset-button-container" span={12}>
              <Button
                block
                onClick={() => {
                  form.resetFields()
                }}
              >
                Reset
              </Button>
            </Col>
            <Col className="solution-form-submit-button-container" span={12}>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Spin>
  )
}
