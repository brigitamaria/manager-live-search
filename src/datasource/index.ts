import { Employee } from "./types";
import { GET_EMPLOYEES_URL } from "./url";

export const fetchData = async (url: string) => {
    const data = await fetch(url);
    return await data.json();
};

export const getEmployees: () => Promise<Employee[]> = async () => {
    const { data } = await fetchData(GET_EMPLOYEES_URL);

    return data;
};