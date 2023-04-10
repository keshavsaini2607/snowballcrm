import server from ".."
import { handleError } from "../../utils/helpers";

export const getDepartments = async() => {
    try {
        const response = await server.get('/api/v2/departments');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}