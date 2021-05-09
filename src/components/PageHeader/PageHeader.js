import { useIsAuthenticated, useAuthUser, useSignOut } from 'react-auth-kit'
import { PageHeader as AntPageHeader, Tooltip, Tag, Avatar, Button } from 'antd'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import packageInfo from '../../../package.json'
import './PageHeader.css'

export function PageHeader() {
  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser()
  const signOut = useSignOut()
  return (
    <AntPageHeader
      backIcon={
        <Tooltip title="Go home">
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Tooltip>
      }
      title={
        <Tooltip title="Go home">
          <Link to="/">{'go-exercises'}</Link>
        </Tooltip>
      }
      tags={<Tag>{packageInfo.version}</Tag>}
      onBack={() => null}
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
            <Button
              className="page-header-log-out-button"
              icon={<LogoutOutlined />}
              onClick={() => signOut()}
            />
          </Tooltip>
        ),
      ]}
    />
  )
}
