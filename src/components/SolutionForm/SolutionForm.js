import { Form, Spin, Row, Col, Button, message } from 'antd'
import { useJSONDataFetchingWithAuthAndErrorHandling } from '../../hooks/hooks.js'
import { useEffect } from 'react'
import { Editor } from '../Editor/Editor.js'
import './SolutionForm.css'

export function SolutionForm(props) {
  const [form] = Form.useForm()
  const { loading, fetchJSONData } =
    useJSONDataFetchingWithAuthAndErrorHandling()

  const setSolution = solution => {
    form.setFieldsValue({ code: solution.Code })
  }
  useEffect(() => {
    ;(async () => {
      if (props.solutionID === undefined) {
        form.resetFields()
        return
      }

      await fetchJSONData('GET', `/api/v1/solutions/${props.solutionID}`, {
        onLoadingSuccess: solution => {
          setSolution(solution)
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
          await fetchJSONData('POST', url, {
            data,

            onLoadingSuccess: () => {
              props.onSolutionSubmission()
              message.success('Solution submitted')
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
                // handle the "Ctrl+S" and "Cmd+S" combinations
                bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
                exec: async () => {
                  await fetchJSONData('POST', '/api/v1/solutions/format', {
                    data: form.getFieldsValue(),

                    onLoadingSuccess: solution => {
                      setSolution(solution)
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
