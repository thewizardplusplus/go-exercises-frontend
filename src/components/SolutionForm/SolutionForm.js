import { useState, useEffect } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { fetchJsonData } from '../../hooks/fetchJsonData.js'
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

      await fetchJsonData('GET', `/api/v1/solutions/${props.solutionID}`, {
        headers: { Authorization: authHeader() },

        onLoadingBeginning: () => {
          setLoading(true)
        },
        onLoadingSuccess: solution => {
          form.setFieldsValue({ code: solution.Code })
        },
        onLoadingEnding: () => {
          setLoading(false)
        },
      })
    })()
  }, [props.solutionID]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Spin spinning={loading}>
      <Form
        className="solution-form"
        initialValues={{ code: props.boilerplateCode }}
        form={form}
        onFinish={async data => {
          const url = `/api/v1/tasks/${props.taskID}/solutions/`
          await fetchJsonData('POST', url, {
            headers: { Authorization: authHeader() },
            data,

            onLoadingBeginning: () => {
              setLoading(true)
            },
            onLoadingSuccess: () => {
              props.onSolutionSubmission()
              message.success('Solution submitted')
            },
            onLoadingEnding: () => {
              setLoading(false)
            },
          })
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
                exec: async () => {
                  await fetchJsonData('POST', '/api/v1/solutions/format', {
                    headers: { Authorization: authHeader() },
                    data: form.getFieldsValue(),

                    onLoadingBeginning: () => {
                      setLoading(true)
                    },
                    onLoadingSuccess: solution => {
                      form.setFieldsValue({ code: solution.Code })
                    },
                    onLoadingEnding: () => {
                      setLoading(false)
                    },
                  })
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
