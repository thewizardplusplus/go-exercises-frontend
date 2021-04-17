import { Switch, Route, Redirect } from 'react-router-dom'
import { PrivateRoute } from 'react-auth-kit'
import { LoginForm } from '../LoginForm/LoginForm.js'

export function RouteSwitch() {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/"
        component={() => 'Content'}
        loginPath={'/login'}
      />

      <Route path="/login">
        <LoginForm />
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}
