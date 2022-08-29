import { useIsAuthenticated } from 'react-auth-kit'
import { useJSONDataFetchingWithErrorHandling } from '../../hooks/hooks.js'
import { useSignIn } from 'react-auth-kit'
import { Redirect, useHistory } from 'react-router-dom'
import { Spin, Form, Input, Button } from 'antd'
import jwtDecode from 'jwt-decode'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export function LoginForm() {
  const isAuthenticated = useIsAuthenticated()
  const { loading, fetchJSONData } = useJSONDataFetchingWithErrorHandling()
  const signIn = useSignIn()
  const history = useHistory()

  return isAuthenticated() ? (
    <Redirect to="/" />
  ) : (
    <Spin spinning={loading}>
      <Form
        wrapperCol={{ span: 6, offset: 9 }}
        onFinish={async data => {
          await fetchJSONData('POST', '/api/v1/tokens/', {
            data,

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
              return false // finishing not required
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
