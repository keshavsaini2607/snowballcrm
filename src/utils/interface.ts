export interface FormFieldInterface {
    controlType: any;
    key: string;
    label: string;
    required: boolean;
    placeholder?: string;
 }
 
 export interface FormInterface {
    title: string;
    subTitle: string;
    formFields: FormFieldInterface[];
 }
 