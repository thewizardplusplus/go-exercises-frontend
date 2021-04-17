import { useHistory } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'
import { useSignOut } from 'react-auth-kit'
import { PageHeader as AntPageHeader, Tag, Tooltip, Button } from 'antd'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import packageInfo from '../../../package.json'
import './PageHeader.css'

export function PageHeader() {
  const history = useHistory()
  const isAuthenticated = useIsAuthenticated()
  const signOut = useSignOut()
  return (
    <AntPageHeader
      backIcon={<HomeOutlined />}
      title="go-exercises"
      tags={<Tag>{packageInfo.version}</Tag>}
      onBack={() => history.push('/')}
      extra={[
        isAuthenticated() && (
          <Tooltip key="1" title="Log out">
            <Button icon={<LogoutOutlined />} onClick={() => signOut()} />
          </Tooltip>
        ),
      ]}
    />
  )
}
