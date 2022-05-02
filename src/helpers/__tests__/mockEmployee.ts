import { DATA_TYPE, GENDER, JOB_LEVEL } from "../../datasource/enums"
import { Employee, EmployeeResponse } from "../../datasource/types"
import { MappedEmployeeWithEmail } from "../../ui/types"

export const data: Employee[] = [
    {
        "type": DATA_TYPE.Employees,
        "id": "1",
        "links": {
          "self": "test1"
        },
        "attributes": {
          "identifier": null,
          "firstName": "John",
          "lastName": "Doe",
          "name": "John Doe",
          "features": [
            "engagement"
          ],
          "avatar": null,
          "employmentStart": "2016-01-31T00:00:00.000Z",
          "external": false,
          "Last Year Bonus": 3767,
          "Business Unit": "Sales",
          "Commute Time": 34,
          "Age": "1984-02-08",
          "Department": "Customer Care",
          "Gender": GENDER.Male,
          "Job Level": JOB_LEVEL.Manager,
          "Local Office": "Kuala Lumpur",
          "% of target": 88,
          "Region": "APAC",
          "Salary": 76000,
          "Tenure": "2014-05-31"
        },
        "relationships": {
          "company": {
            "data": {
              "type": "companies",
              "id": "5"
            }
          },
          "account": {
            "data": {
              "type": "accounts",
              "id": "1"
            }
          },
          "phones": {
            "data": []
          },
          "Manager": {
            "data": {
              "type": "employees",
              "id": "201"
            }
          }
        }
      }
]

const included: Employee[] = [
    {
      "type": DATA_TYPE.Accounts,
      "id": "1",
      "links": {
        "self": "test1"
      },
      "attributes": {
        "email": "john.doe@kinetar.com",
        "locale": null,
        "timezone": null,
        "bouncedAt": null,
        "bounceReason": null,
        "localeEffective": "en-GB",
        "timezoneEffective": null
      }
    },
    {
        "type": DATA_TYPE.Employees,
        "id": "201",
        "links": {
          "self": "http://localhost:3000/v1/employees/201"
        },
        "attributes": {
          "identifier": null,
          "firstName": "Derrick",
          "lastName": "Cummings",
          "name": "Derrick Cummings",
          "features": [
            "engagement"
          ],
          "avatar": null,
          "employmentStart": "2016-01-31T00:00:00.000Z",
          "external": false,
          "Last Year Bonus": 9214,
          "Business Unit": "Sales",
          "Commute Time": 6,
          "Age": "1992-07-08",
          "Department": "Customer Care",
          "Gender": GENDER.Male,
          "Job Level": JOB_LEVEL.SeniorManager,
          "Local Office": "Seoul",
          "% of target": 31,
          "Region": "APAC",
          "Salary": 142000,
          "Tenure": "2013-11-07"
        },
        "relationships": {
          "company": {
            "data": {
              "type": "companies",
              "id": "5"
            }
          },
          "account": {
            "data": {
              "type": "accounts",
              "id": "202"
            }
          },
          "phones": {
            "data": []
          },
          "Manager": {
            "data": {
              "type": "employees",
              "id": "194"
            }
          }
        }
      }
]

export const mockEmployeeResponse: EmployeeResponse = {
    data,
    included
}

export const expectedEmployeeReturnValue: MappedEmployeeWithEmail[] = [
  {
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    "name": "John Doe",
    "jobLevel": JOB_LEVEL.Manager,
    "email": "john.doe@kinetar.com"
  }, 
  {
    "id": "201",
    "firstName": "Derrick",
    "lastName": "Cummings",
    "name": "Derrick Cummings",
    "jobLevel": JOB_LEVEL.SeniorManager
  }
]