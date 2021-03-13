import React from "react";
import { FormikProps, useField } from "formik";
import styled from "styled-components";

type MyFieldProps = React.InputHTMLAttributes<any> & {
  // You can add more input types here
  as?: "radio" | "input" | "select" | "radio" | "checkbox" | "textarea";
  name: string;
  formData?: FormikProps<any>;
};

function TextareaField(props: MyFieldProps) {
  const [field, meta] = useField(props.name);

  return <TextInput value={meta.value} onChange={field.onChange} {...props} />;
}

export default TextareaField;

const TextInput = styled.textarea`
  width: 100%;
  border: none;

  &:focus {
    outline: none;
  }
`;
