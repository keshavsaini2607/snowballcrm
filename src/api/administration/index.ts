import server from "..";
import { handleError } from "../../utils/helpers";
import { AdministrationDataProps } from "./types";

export const getAdministrationData = async (props: any) => {
   try {
      let {page, page_size} = props?.queryKey[1];
      const response = await server.get(`/api/v2/users?page=${page}&page_size=${page_size}`);
      return response.data;
   } catch (error) {
      handleError(error);
   }
};
