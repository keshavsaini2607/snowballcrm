import server from "..";
import { handleError } from "../../utils/helpers";
import { CreateUserPayload } from "./types";

export const getUsers = async ({ page, page_size }: any) => {
   try {
      const response = await server.get(
         `api/v2/users?page=${page}&page_size=${page_size}`
      );
      return response.data;
   } catch (error) {
      handleError(error);
   }
};

export const createUser = async(payload: any) => {
   try {
      const response = await server.post('/api/v2/users', payload);
      return response.data;
   } catch (error) {
      handleError(error);
   }
}

export const saveUserAttribute = async(payload: any) => {
   try {
      const response = await server.put(`/api/v2/users/${payload.user_id}/user-attributes`, payload);
      return response.data;
   } catch (error) {
      handleError(error);
   }
}

export const deleteUser = async() => {
   try {
      const response = await server.delete(`/api/v2/users`);
   } catch (error) {
      handleError(error);
   }
}