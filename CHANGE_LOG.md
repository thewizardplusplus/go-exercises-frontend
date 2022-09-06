# Change Log

## [v1.5.1](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.5.1) (2022-08-29)

## [v1.5](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.5) (2022-06-17)

## [v1.4](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.4) (2022-06-11)

## [v1.3](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.3) (2021-09-24)

Update the current URL on the pagination changing in the task group component and in the solution group component; update the solution group component.

- Update the pagination:
  - In the task group component:
    - Receive the page count from the server in the task group component
    - Update the current URL on the pagination changing in the task group component
  - In the solution group component:
    - Receive the page count from the server in the solution group component
    - Update the current URL on the pagination changing in the solution group component
- Update the solution group component:
  - Fix the item title in the solution group component
  - Fix the item fields in the solution group component
  - Update the task status on the updating of the corresponding solutions
- Update the solution details component:
  - Add the test case note component
  - Fix the test case component

## [v1.2](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.2) (2021-05-10)

Add the support for [Markdown](https://daringfireball.net/projects/markdown/) in the task component; use the [Ace](https://ace.c9.io/) editor in the task and solution forms components.

- Support for [Markdown](https://daringfireball.net/projects/markdown/):
  - Render Markdown in the task component
  - Support for [GitHub Flavored Markdown](https://github.github.com/gfm/) in the task component
  - Improve the styles of Markdown in the task component
  - Add the Markdown component:
    - Add the Markdown component
    - Support for the syntax highlighting in the Markdown component
    - Fix the styles of tables in the Markdown component
- Use the [Ace](https://ace.c9.io/) editor:
  - Use the Ace editor in the task form component
  - Use the Ace editor in the solution form component
  - Add the editor component:
    - Add the editor component
    - Add the formatting command (triggered by pressing <kbd>Ctrl</kbd>+<kbd>S</kbd>)

## [v1.1](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.1) (2021-05-09)

Add the pagination; display the status sign in the task group component and in the task component; update the task and solution details components.

- Remove the sorting from the solution group component
- Add the pagination:
  - Add the pagination to the task group component:
    - Add the `loadTasks()` function to the task group component
  - Add the pagination to the solution group component
- Displaying the status sign:
  - Fix the color of the failure sign in the solution group component
  - Add the status sign to the task group component
  - Add the status sign to the task component
  - Add the status sign component
- Update the task and solution details components:
  - Fix the styles:
    - Fix the styles of the task details component
    - Fix the styles of the solution details component:
      - Display the solution details as a preformatted text
  - Additionally display the quoted string in the solution details component
  - Displaying the user:
    - Display the user in the task details component
    - Display the user in the solution details component
  - Add the item details component:
    - Add the item details component
    - Remove the task details component
    - Simplify the usage of the item details component
  - Add the test case component
- Update the page header component:
  - Add the links to the homepage in the page header component
  - Fix the tooltips in the page header component

## [v1.0.1](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.0.1) (2021-04-25)

Add the [Docker](https://www.docker.com/) configuration for building.

- Add the [Docker](https://www.docker.com/) configuration for building
- Add the [Docker Compose](https://docs.docker.com/compose/) configuration for building

## [v1.0](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.0) (2021-04-21)

Displaying a solution group and a single solution; add the solution form.

- Fix the styles:
  - Fix the style of the page header
  - Fix the style of the task group
  - Fix the style of the task page:
    - Fix the task title on the task page
  - Fix the style of the task form
- Displaying a solution group:
  - Add the basics of the solution group component
  - Add the loading of the solutions to the solution group component
  - Display the solutions in the solution group component
  - Sort the solutions by their creation timestamps in the solution group component
  - Add the update button to the solution group component
  - Fix the titles of the solutions in the solution group component
- Displaying a single solution:
  - Add the solution details component
- Add the solution form:
  - Add the solution form
  - Load the selected solution to the solution form
  - Add the reset button to the solution form
  - Show the solutions on the solution submission

## [v1.0-alpha.1](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.0-alpha.1) (2021-04-20)

Displaying a task group and a single task; add the task form for task creation and editing.

- Simplify the styles of the login form
- Displaying a task group:
  - Add the loading of the tasks
  - Display the tasks
  - Add the links to the separate tasks
  - Add the button for task creation
- Displaying a single task:
  - Add the loading of the task
  - Display the task
  - Add the task deletion
  - Hide the action buttons for other users' tasks
- Add the task form:
  - Add the task form for task creation
  - Upgrade the task form for task editing
  - Use the monospace font in the task form
- Add the task details component

## [v1.0-alpha](https://github.com/thewizardplusplus/go-exercises-frontend/tree/v1.0-alpha) (2021-04-17)

Add the basics of the layout and the routing; add the page header and the login form.

- Add the basic layout
- Implement the basics of the routing
- Add the page header:
  - Implement the signing out
  - Display the user avatar
  - Fix the background color of the page header elements
  - Add the tooltip for the home button
- Add the login form:
  - Add the basics of the login form
  - Implement the logging in the login form
  - Decode the access token
  - Implement the signing in
  - Redirect authenticated users from the login form
