import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { Spin, Form, Input, Row, Col, Button, message } from 'antd'
import './SolutionForm.css'

export function SolutionForm(props) {
  const [loading, setLoading] = useState(false)
  const authHeader = useAuthHeader()

  useEffect(() => {
    props.form.resetFields()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Spin spinning={loading}>
      <Form
        className="solution-form"
        initialValues={{ code: props.boilerplateCode }}
        form={props.form}
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

            message.success('Solution submitted')
          } catch (exception) {
            message.error(exception.toString())
          } finally {
            setLoading(false)
          }
        }}
      >
        <Form.Item name="code">
          <Input.TextArea
            className="solution-form-monospace-font"
            autoSize={{ minRows: 3 }}
          />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col className="solution-form-reset-button-container" span={12}>
              <Button
                block
                onClick={() => {
                  props.form.resetFields()
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
