export interface DataShare {
   department_id: string;
   is_shared: boolean;
}

export interface DataShareProps {
   department: string;
   shared_to: DataShare[];
}
