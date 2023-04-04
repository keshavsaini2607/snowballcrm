import server from ".."
import { handleError } from "../../utils/helpers";
import { CreateLeadAttributeProps } from "./types";

export const getLeadAttributes = async() => {
    try {
        const response = await server.get(`/api/v2/lead-attributes`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const createUserAttribute = async(props: CreateLeadAttributeProps) => {
    try {
        const response = await server.post('/api/v2/lead-attributes', props);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const DeleteUserAttribute = async(lAId: string) => {
    try {
        const response = await server.delete(`/api/v2/user-attributes?lead_attribute_id=${lAId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}