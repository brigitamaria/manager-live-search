# Manager Live Search

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

Changes applied in `src` directory.
`src` contains these folders:
- `datasource`

  Contains enums, types, and action related to data fetching
- `helpers`

  Contains helper functions that are separated from the UI functions and/or can be reused to serve same purpose. In this project, we currently only have one function (`mapEmployeesWithAccountEmail`) that is used for processing data that we retrieve from `getEmployees` API.

- `ui`

  Contains assets and components related to view.
  Inside `ui` > `components`, we have 2 components (Avatar and InputAutocomplete)

## Processing JSON Data to UI
The JSON Data is retrieved from `https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json` which contains 2 arrays that are related to employee data in `data` and `included`.
`data` contains data with type `employees` and `included` contains data with type `accounts` and `employees`.

Since we need to display the e-mail of every employee and the e-mail exists in `included` data with type `account`, we need to map the data using `mapEmployeesWithAccountEmail` function. This function processes `data` and `included` to be separated by its type (`employees` or `account`) and looks up each employee data's relationship to its account so we can construct an array of object with `MappedEmployeeWithEmail` type as a return value to be used in the UI.

```
// src > datasource > enums.ts

export enum JOB_LEVEL {
    Manager = "Manager",
    Executive = "Executive",
    SeniorManager = "Senior Manager"
}

// src > ui > types.ts

type MappedEmployeeWithEmail = {
    id: string
    firstName: string
    lastName: string
    name: string
    email?: string
    jobLevel?: JOB_LEVEL
}
```

The UI consists of an input which can show search result from user's typing.

<img width="519" alt="image" src="https://user-images.githubusercontent.com/17190327/166188901-8793a6c1-8f27-45ed-9286-788f1ece800f.png">

Each search result contains an avatar which represents the first character of an employee's first name and last name. The background color of the avatar represents job level of an employee.

<img width="239" alt="image" src="https://user-images.githubusercontent.com/17190327/166191421-34a1fbfd-eecb-42a4-8bc0-8f1147de77ed.png">

Beside the avatar, the search result also displays the name and email of each employee.

Main interactions of the UI cover these cases:
- When user clicks into the input field, he/she sees the full list of managers.
- The list shows up to 2 managers, the rest can be seen by scrolling inside the list.
- When user starts typing into the input field, matching results appear in the list. 
  -  Managers are filtered on both first name and last name. 
  -  Filtering is case insensitive. 
  -  Managers are filtered across first name and last name (eg. “tMc” => Harriet McKinnley.)
-  When user confirms the selection with the enter key, the full name of the selected manager is displayed in the input field and the list of available managers hides.
-  User can navigate the list of managers with arrow up and arrow down keys.
-  When the input loses focus, the list of available managers disappears and the entered value is being kept.
   -  When the user clicks back into the input field a list of filtered managers by the kept value is shown.
