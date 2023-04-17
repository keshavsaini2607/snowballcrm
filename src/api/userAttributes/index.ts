import server from ".."
import { handleError } from "../../utils/helpers";
import { CreateAttributeProps } from "./types";

export const getUserAttributes = async() => {
    try {
        const response = await server.get(`/api/v2/user-attributes`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const createUserAttribute = async(props: CreateAttributeProps) => {
    try {
        const response = await server.post('/api/v2/user-attributes', props);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const DeleteUserAttribute = async(uAId: string) => {
    try {
        const response = await server.delete(`/api/v2/user-attributes?user_attribute_id=${uAId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const getAttributeTypes = async() => {
    try {
        const response = await server.get('/types/attribute');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const getAllActivityAccessTypes = async() => {
    try {
        const response = await server.get('/types/activity-access');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}