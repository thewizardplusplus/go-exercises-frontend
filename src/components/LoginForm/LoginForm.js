import { useState } from 'react'
import { useSignIn } from 'react-auth-kit'
import { Redirect, useHistory } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'
import { Spin, Form, Input, Button } from 'antd'
import { fetchJsonData } from '../../hooks/fetchJsonData.js'
import jwtDecode from 'jwt-decode'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export function LoginForm() {
  // hooks should be called unconditionally
  const [loading, setLoading] = useState(false)
  const signIn = useSignIn()
  const history = useHistory()

  const isAuthenticated = useIsAuthenticated()
  if (isAuthenticated()) {
    return <Redirect to="/" />
  }

  return (
    <Spin spinning={loading}>
      <Form
        wrapperCol={{ span: 6, offset: 9 }}
        onFinish={async data => {
          await fetchJsonData('POST', '/api/v1/tokens/', {
            data,

            onLoadingBeginning: () => {
              setLoading(true)
            },
            onLoadingSuccess: credentials => {
              const decodedCredentials = jwtDecode(credentials.AccessToken)
              const isSignedIn = signIn({
                tokenType: 'Bearer',
                token: credentials.AccessToken,
                expiresIn: decodedCredentials.exp / 60, // convert seconds to minutes
                authState: decodedCredentials.User,
              })
              if (!isSignedIn) {
                throw new Error('unable to sign in')
              }

              history.push('/')
            },
            onLoadingEnding: isSuccessful => {
              if (!isSuccessful) {
                setLoading(false)
              }
            },
          })
        }}
      >
        <Form.Item name="username">
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
