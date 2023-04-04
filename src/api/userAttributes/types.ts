export interface CreateAttributeProps {
    name: string;
    attribute_type_id: number;
    length: number;
    flag_verified: boolean;
    flag_required: boolean;
    flag_immutable: boolean;
    flag_deleted: boolean;
}