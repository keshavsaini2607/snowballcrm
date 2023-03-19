import server from "..";
import { handleError } from "../../utils/helpers";
import { AdministrationDataProps } from "./types";

export const getAdministrationData = async (props: AdministrationDataProps) => {
   try {
      const response = await server.post("/frontend/administration/data", props);
      return response.data;
   } catch (error) {
      handleError(error);
   }
};
