import React, { useEffect } from "react";
import { FormInterface } from "../../../../utils/interface";
import * as yup from "yup";
import DynamicForm from "../../../DynamicForm";
import { CreateAttributeProps } from "../../../../api/userAttributes/types";
import { useMutation, useQueryClient } from "react-query";
import { createUserAttribute } from "../../../../api/userAttributes";

let formData: FormInterface = {
   title: "Register",
   subTitle: "Let's get you started!",
   formFields: [
      {
         multiFields: [
            {
               controlType: "text",
               key: "name",
               label: "Name",
               required: true,
               placeholder: "Attribute name",
            },
            {
               controlType: "text",
               key: "length",
               label: "Attribute Length",
               required: true,
               placeholder: "Type",
            },
         ],
      },
      {
         controlType: "dropdown",
         key: "attributeType",
         label: "Attribute Type",
         required: true,
         placeholder: "Type",
      },
   ],
};

const schema = yup
   .object({
      name: yup.string().required(" is required"),
      attributeType: yup.string().required(" is required"),
      length: yup.string().required(" is required"),
   })
   .required();

const AddColumn = ({handleClose}: any) => {
   const queryClient = useQueryClient();

   const handleSubmit = (values: any) => {
      let props: CreateAttributeProps = {
         name: values.name,
         length: values.length,
         attribute_type_id: 1,
         flag_deleted: false,
         flag_immutable: false,
         flag_required: false,
         flag_verified: false,
      };
      saveUserAttributeMutation.mutate(props);
      handleClose();
   };

   const saveUserAttributeMutation = useMutation(createUserAttribute, {
      onSuccess(data, variables, context) {
         queryClient.refetchQueries('userAttributes');
         window.location.reload();
      },
      onError(error, variables, context) {
         
      },
   });

   return (
      <div className="py-4">
         <DynamicForm
            data={formData}
            submit={handleSubmit}
            btnText="Create"
            schema={schema}
            loading={saveUserAttributeMutation.isLoading}
         />
      </div>
   );
};

export default AddColumn;
