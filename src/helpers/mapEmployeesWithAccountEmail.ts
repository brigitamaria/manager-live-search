import { DATA_TYPE } from "../datasource/enums";
import { AccountAttribute, Employee, EmployeeAttribute, EmployeeResponse } from "../datasource/types";
import { MappedEmployeeWithEmail } from "../ui/types";

export const mapEmployeesWithAccountEmail = (res: EmployeeResponse) => {
    const { data, included } = res
    const mappedEmployees: MappedEmployeeWithEmail[] = [];

    const allEmployees: Employee[] = [];
    const allAccounts: Employee[] = [];
    const idDirectory: {[id: string]: boolean} = {};

    [...data, ...included].forEach((datum) => {
        if (datum.type === DATA_TYPE.Employees) {
            if (!idDirectory[datum.id]) {
                idDirectory[datum.id] = true;
                allEmployees.push(datum);
            }
        } else {
            allAccounts.push(datum);
        }
    });

    allEmployees.forEach((employee) => {
        const attributes = employee.attributes as EmployeeAttribute;
        const defaultEmployeeData: MappedEmployeeWithEmail = {
            id: employee.id,
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            jobLevel: attributes["Job Level"]
        };
        const accountRelation = employee.relationships?.account.data;
        if (accountRelation?.type === DATA_TYPE.Accounts) {
            const findAccount = allAccounts.find((account) => account.id === accountRelation.id);
            if (findAccount) {
                defaultEmployeeData.email = (findAccount.attributes as AccountAttribute).email
            }
        }
        mappedEmployees.push(defaultEmployeeData);
    })

    return mappedEmployees
}