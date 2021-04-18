import { Layout as AntLayout } from 'antd'
import { PageHeader } from '../PageHeader/PageHeader.js'
import { RouteSwitch } from '../RouteSwitch/RouteSwitch.js'
import 'antd/dist/antd.css'
import './Layout.css'

export function Layout() {
  return (
    <AntLayout>
      <AntLayout.Header>
        <PageHeader />
      </AntLayout.Header>

      <AntLayout.Content>
        <RouteSwitch />
      </AntLayout.Content>

      <AntLayout.Footer>
        Copyright &copy; 2021 thewizardplusplus
      </AntLayout.Footer>
    </AntLayout>
  )
}
