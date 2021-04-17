import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginForm } from '../LoginForm/LoginForm.js'

export function RouteSwitch() {
  return (
    <Switch>
      <Route exact path="/">
        Content
      </Route>

      <Route path="/login">
        <LoginForm />
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}
