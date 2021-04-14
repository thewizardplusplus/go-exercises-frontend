import { Layout as AntLayout } from 'antd'
import { PageHeader } from '../PageHeader/PageHeader.js'
import 'antd/dist/antd.css'
import './Layout.css'

export function Layout() {
  const { Header, Content, Footer } = AntLayout
  return (
    <AntLayout>
      <Header>
        <PageHeader />
      </Header>

      <Content>Content</Content>

      <Footer>Copyright &copy; 2021 thewizardplusplus</Footer>
    </AntLayout>
  )
}
