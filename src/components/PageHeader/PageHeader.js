import { PageHeader as AntPageHeader, Tag, message } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import packageInfo from '../../../package.json'
import './PageHeader.css'

export function PageHeader() {
  return (
    <AntPageHeader
      backIcon={<HomeOutlined />}
      title="go-exercises"
      tags={<Tag>{packageInfo.version}</Tag>}
      onBack={() => message.info('Going back')}
    />
  )
}
