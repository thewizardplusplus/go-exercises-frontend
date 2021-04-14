import { Layout as AntLayout } from 'antd'
import { PageHeader } from '../PageHeader/PageHeader.js'
import { LoginForm } from '../LoginForm/LoginForm.js'
import 'antd/dist/antd.css'
import './Layout.css'

export function Layout() {
  const { Header, Content, Footer } = AntLayout
  return (
    <AntLayout>
      <Header>
        <PageHeader />
      </Header>

      <Content>
        <LoginForm />
      </Content>

      <Footer>Copyright &copy; 2021 thewizardplusplus</Footer>
    </AntLayout>
  )
}
