import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout/Layout.js'

ReactDOM.render(
  <StrictMode>
    <AuthProvider authType="localstorage">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root'),
)
