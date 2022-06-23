import { useIsAuthenticated, useAuthUser, useSignOut } from 'react-auth-kit'
import { PageHeader as AntPageHeader, Tooltip, Tag, Avatar, Button } from 'antd'
import { Link } from 'react-router-dom'
import packageInfo from '../../../package.json'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import './PageHeader.css'

export function PageHeader() {
  const isAuthenticated = useIsAuthenticated()
  const authUser = useAuthUser()
  const signOut = useSignOut()

  return (
    <AntPageHeader
      backIcon={
        <Tooltip title="Homepage">
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Tooltip>
      }
      title={
        <Tooltip title="Homepage">
          <Link to="/">{'go-exercises'}</Link>
        </Tooltip>
      }
      tags={<Tag>{packageInfo.version}</Tag>}
      onBack={() => null}
      extra={[
        isAuthenticated() && (
          <Tooltip key="1" title={authUser().Username}>
            <Avatar className="page-header-user-avatar">
              {authUser().Username.toUpperCase().charAt(0)}
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
