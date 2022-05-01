import { GENDER, JOB_LEVEL } from "./enums"

export type EmployeeResponse = {
    data: Employee[]
}

export type Employee = {
    type: string
    id: string
    links: {
        self: string
    }
    attributes: EmployeeAttribute
    relationships: {
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