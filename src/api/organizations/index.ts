import server from "..";
import { handleError } from "../../utils/helpers";
import { CreateOrganizationPayload } from "./types";

export const getOrganizations = async (token: string) => {
   try {
      server.defaults.headers.common = {
         Authorization: `Bearer ${token}`,
      };
      const response = await server.get("/api/v2/organizations");
      return response.data;
   } catch (error) {
      handleError(error);
   }
};

export const createOrganization = async (
   payload: CreateOrganizationPayload
) => {
   try {
      const response = await server.post("/api/v2/organizations", payload);
      return response.data;
   } catch (error) {
      handleError(error);
   }
};

export const selectOrganization = async (orgId: string) => {
   try {
      const response = await server.post(`/api/v2/organizations/${orgId}`);
      return response.data;
   } catch (error) {
      handleError(error);
   }
};
