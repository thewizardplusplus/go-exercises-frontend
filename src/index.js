import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout/Layout.js'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
)
