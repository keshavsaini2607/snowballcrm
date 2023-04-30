import server from ".."
import { handleError } from "../../utils/helpers";

export const getActivityAccess = async() => {
    try {
        const response = await server.get('/types/activity-access');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}