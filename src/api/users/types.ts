export interface CreateUserPayload {
   username: string;
   active: boolean;
   department_id: string;
   user_role: string;
   department_name: string;
   user_attributes: any[];
   user_attributes_access: any[];
   lead_attributes_access: any[];
   activity_access: any[];
   forms_access: any[];
}
