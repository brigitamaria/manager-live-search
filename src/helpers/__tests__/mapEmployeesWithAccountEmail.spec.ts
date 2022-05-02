import { mapEmployeesWithAccountEmail } from "../mapEmployeesWithAccountEmail";
import { expectedEmployeeReturnValue, mockEmployeeResponse, data as mockData } from "./mockEmployee";

describe('mapEmployeesWithAccountEmail helper', () => {
    it('should return array of MappedEmployeeWithEmail', () => {
        expect(mapEmployeesWithAccountEmail(mockEmployeeResponse)).toStrictEqual(expectedEmployeeReturnValue);
    });

    it('should skip same employee data', () => {
        expect(mapEmployeesWithAccountEmail({
            data: mockEmployeeResponse.data,
            included: [...mockEmployeeResponse.included, ...mockEmployeeResponse.data]
        })).toStrictEqual(expectedEmployeeReturnValue);
    });

    it('should handle employee with no account relationship', () => {
        expect(mapEmployeesWithAccountEmail({
            data: [{
                ...mockData[0],
                relationships: undefined
            }],
            included: []
        })).toStrictEqual([{
            "id": "1",
            "firstName": "John",
            "lastName": "Doe",
            "name": "John Doe",
            "jobLevel": "Manager"
          }]);
    });
});