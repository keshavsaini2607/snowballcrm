import server from ".."
import { handleError } from "../../utils/helpers";
import { DataShareProps } from "./types";

export const getDepartments = async() => {
    try {
        const response = await server.get('/api/v2/departments');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const getDepartmentDataShare = async(departmentId: string) => {
    try {
        const response = await server.get(`/api/v2/departments/${departmentId}/data-share`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const shareData = async(payload: DataShareProps) => {
    try {
        
        const response = await server.post(`/api/v2/departments/${payload.department}/data-share`, {shared_to: payload.shared_to});
        return response.data;
    } catch (error) {
        handleError(error);
    }
}