import { JOB_LEVEL } from "../datasource/enums"

export type MappedEmployeeWithEmail = {
    id: string
    firstName: string
    lastName: string
    name: string
    email?: string
    jobLevel?: JOB_LEVEL
}