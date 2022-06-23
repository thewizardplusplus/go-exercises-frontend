import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useJsonDataFetchingWithAuth } from '../../hooks/hooks.js'
import { Spin, Form, Input, Card, Tooltip, Row, Col, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Editor } from '../Editor/Editor.js'
import './TaskForm.css'

export function TaskForm() {
  const { loading, fetchJsonData } = useJsonDataFetchingWithAuth()
  const { id } = useParams()
  const [form] = Form.useForm()
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      if (id === undefined) {
        form.setFieldsValue({ testCases: [{ input: '', expectedOutput: '' }] })
        return
      }

      await fetchJsonData('GET', `/api/v1/tasks/${id}`, {
        onLoadingSuccess: task => {
          form.setFieldsValue({
            title: task.Title,
            description: task.Description,
            boilerplateCode: task.BoilerplateCode,
            testCases: task.TestCases.map(testCase => ({
              input: testCase.Input,
              expectedOutput: testCase.ExpectedOutput,
            })),
          })
        },
      })
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const saveTask = async (data, handler) => {
    const method = id === undefined ? 'POST' : 'PUT'
    await fetchJsonData(method, `/api/v1/tasks/${id ?? ''}`, {
      data: {
        ...data,
        testCases: data.testCases.map(testCase => ({
          Input: testCase.input,
          ExpectedOutput: testCase.expectedOutput,
        })),
      },

      onLoadingSuccess: task => {
        let idForRedirection = id ?? task.ID
        return handler(idForRedirection)
      },
    })
  }
  return (
    <Spin spinning={loading}>
      <Form
        className="task-form"
        layout="vertical"
        form={form}
        onKeyDown={event => {
          // handle the "Ctrl+S" and "Cmd+S" combinations
          if (!(event.ctrlKey || event.metaKey) || event.code !== 'KeyS') {
            return
          }

          saveTask(form.getFieldsValue(), idForRedirection => {
            if (id !== undefined) {
              return
            }

            history.push(`/tasks/${idForRedirection}/edit`)
            return false // finishing not required
          })

          event.preventDefault()
        }}
        onFinish={async data => {
          await saveTask(data, idForRedirection => {
            history.push(`/tasks/${idForRedirection}`)
            return false // finishing not required
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

        <Form.List name="testCases">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Card
                  key={field.key}
                  size="small"
                  title={`Test case #${index + 1}`}
                  extra={
                    fields.length < 2 ? null : (
                      <Tooltip title="Delete test case">
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      </Tooltip>
                    )
                  }
                >
                  <Form.Item
                    {...field}
                    label="Input"
                    name={[field.name, 'input']}
                  >
                    <Input.TextArea autoSize={true} />
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(previousData, currentData) => {
                      return (
                        previousData.expectedOutput !==
                        currentData.expectedOutput
                      )
                    }}
                  >
                    <Form.Item
                      {...field}
                      label="Expected output"
                      name={[field.name, 'expectedOutput']}
                    >
                      <Input.TextArea autoSize={true} />
                    </Form.Item>
                  </Form.Item>
                </Card>
              ))}

              <Form.Item>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    add()
                  }}
                >
                  Add test case
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
