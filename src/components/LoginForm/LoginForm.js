import { useState } from 'react'
import { Spin, Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './LoginForm.css'

export function LoginForm() {
  const { Item } = Form
  const { Password } = Input
  const [loading, setLoading] = useState(false)
  return (
    <Spin spinning={loading}>
      <Form
        wrapperCol={{ span: 6, offset: 9 }}
        onFinish={async data => {
          setLoading(true)

          try {
            const response = await fetch('/api/v1/tokens/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            })
            if (!response.ok) {
              const errMessage = await response.text()
              throw new Error(errMessage)
            }

            const credentials = await response.json()
            console.log(credentials)

            message.info('Has been logged')
          } catch (exception) {
            message.error(exception.toString())
          } finally {
            setLoading(false)
          }
        }}
      >
        <Item name="username">
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Item>

        <Item name="password">
          <Password prefix={<LockOutlined />} placeholder="Password" />
        </Item>

        <Item>
          <Button
            className="login-form-submit-button"
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Item>
      </Form>
    </Spin>
  )
}
