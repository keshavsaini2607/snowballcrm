import server from "..";
import { handleError } from "../../utils/helpers";

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
