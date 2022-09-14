# go-exercises-frontend

Front-end of the service for solving programming exercises.

## Features

- general features:
  - based on the [Ant Design](https://ant.design/):
    - adaptive design;
    - mobile design;
  - navigation via the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API);
  - asynchronous interaction with the back-end via [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):
    - animating interaction with the back-end;
    - displaying errors on interaction with the back-end in the form of pop-up notifications;
- pages:
  - login form page:
    - used components:
      - login form component;
    - redirect to the login page on authorization errors;
  - task group page:
    - used components:
      - task group component;
    - support for the pagination;
  - task form page:
    - used components:
      - task form component;
    - use the [Ace](https://ace.c9.io/) editor;
    - handle the <kbd>Ctrl</kbd>+<kbd>S</kbd> combination for saving;
    - implement the special editor of test cases;
  - single task page:
    - used components:
      - single task component;
      - solution group component:
        - support for the pagination;
        - update by the appropriate button;
      - solution form component:
        - use the Ace editor;
        - handle the <kbd>Ctrl</kbd>+<kbd>S</kbd> combination for formatting;
      - single solution component:
        - display for the appropriate test case:
          - input;
          - expected output;
          - actual output;
          - error message:
            - additionally display the quoted string from the error message;
    - tabs:
      - task description tab (default):
        - render [Markdown](https://daringfireball.net/projects/markdown/);
      - solution group tab:
        - has its own URL route;
        - has the display mode for an individual solution:
          - has its own URL route.

## Installation

Clone this repository:

```
$ git clone https://github.com/thewizardplusplus/go-exercises-frontend.git
$ cd go-exercises-frontend
```

Install the dependencies:

```
$ npm install
```

Build the project:

```
$ npm run build
```

## License

The MIT License (MIT)

Copyright &copy; 2021-2022 thewizardplusplus
