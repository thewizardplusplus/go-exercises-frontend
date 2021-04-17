import { useHistory } from 'react-router-dom'
import { useIsAuthenticated, useAuthUser, useSignOut } from 'react-auth-kit'
import { PageHeader as AntPageHeader, Tag, Tooltip, Avatar, Button } from 'antd'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import packageInfo from '../../../package.json'
import './PageHeader.css'

export function PageHeader() {
  const history = useHistory()
  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser()
  const signOut = useSignOut()
  return (
    <AntPageHeader
      backIcon={<HomeOutlined />}
      title="go-exercises"
      tags={<Tag>{packageInfo.version}</Tag>}
      onBack={() => history.push('/')}
      extra={[
        isAuthenticated() && (
          <Tooltip key="1" title={auth().Username}>
            <Avatar className="page-header-user-avatar">
              {auth().Username.toUpperCase().charAt(0)}
            </Avatar>
          </Tooltip>
        ),
        isAuthenticated() && (
          <Tooltip key="2" title="Log out">
            <Button icon={<LogoutOutlined />} onClick={() => signOut()} />
          </Tooltip>
        ),
      ]}
    />
  )
}
