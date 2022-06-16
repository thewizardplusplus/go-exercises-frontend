import { Switch, Route, Redirect } from 'react-router-dom'
import { PrivateRoute } from 'react-auth-kit'
import { TaskGroup } from '../TaskGroup/TaskGroup.js'
import { TaskForm } from '../TaskForm/TaskForm.js'
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
        path="/page/:page"
        component={() => <TaskGroup />}
        loginPath={'/login'}
      />

      <PrivateRoute
        exact
        path="/tasks/new"
        component={() => <TaskForm />}
        loginPath={'/login'}
      />

      <PrivateRoute
        exact
        path="/tasks/:id"
        component={() => <Task />}
        loginPath={'/login'}
      />

      <PrivateRoute
        exact
        path="/tasks/:id/edit"
        component={() => <TaskForm />}
        loginPath={'/login'}
      />

      <PrivateRoute
        exact
        path="/tasks/:id/solutions"
        component={() => <Task solutionGroupMode={true} />}
        loginPath={'/login'}
      />

      <PrivateRoute
        exact
        path="/tasks/:id/solutions/page/:page"
        component={() => <Task solutionGroupMode={true} />}
        loginPath={'/login'}
      />

      <PrivateRoute
        exact
        path="/tasks/:id/solutions/:solutionID"
        component={() => <Task solutionGroupMode={true} />}
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
