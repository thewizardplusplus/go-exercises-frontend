import { Switch, Route, Redirect } from 'react-router-dom'
import { PrivateRoute } from 'react-auth-kit'
import { TaskGroup } from '../TaskGroup/TaskGroup.js'
import { Task } from '../Task/Task.js'
import { LoginForm } from '../LoginForm/LoginForm.js'

export function RouteSwitch() {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/"
        component={() => <TaskGroup />}
        loginPath={'/login'}
      />

      <PrivateRoute
        exact
        path="/tasks/:id"
        component={() => <Task />}
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
