import { EmployeeResponse } from "./types";
import { GET_EMPLOYEES_URL } from "./url";

export const fetchData = async (url: string) => {
    const data = await fetch(url);
    return await data.json();
};

export const getEmployees: () => Promise<EmployeeResponse> = async () => {
    const { data, included } = await fetchData(GET_EMPLOYEES_URL);

    return { data, included };
};