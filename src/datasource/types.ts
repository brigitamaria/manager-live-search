import { DATA_TYPE, GENDER, JOB_LEVEL } from "./enums"

export type EmployeeResponse = {
    data: Employee[]
    included: Employee[]
}

export type Employee = Attribute & {
    id: string
    links: {
        self: string
    }
    relationships?: {
        company: {
            data: RelationshipData
        }
        account: {
            data: RelationshipData
        }
        phones: {
            data: []
        }
        Manager?: {
            data: RelationshipData
        }
    }
}

type Attribute = {
    type: DATA_TYPE.Accounts,
    attributes: AccountAttribute
} | {
    type: DATA_TYPE.Employees,
    attributes: EmployeeAttribute
}

export type EmployeeAttribute = {
    identifier: null
    firstName: string
    lastName: string
    name: string
    features: string[]
    avatar: null
    employmentStart: string
    external: boolean
    "Last Year Bonus"?: number
    "Business Unit"?: string
    "Commute Time"?: number
    Age?: string
    Department?: string
    Gender?: GENDER,
    "Job Level"?: JOB_LEVEL
    "Local Office"?: string,
    "% of target"?: number,
    Region?: string,
    Salary?: number,
    Tenure?: string
}

type RelationshipData = {
    type: string
    id: string
}

export type AccountAttribute = {
    email: string
    locale: null
    timezone: null
    bouncedAt: null
    bounceReason: null
    localeEffective: string
    timezoneEffective: null
}