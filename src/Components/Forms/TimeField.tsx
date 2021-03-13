import React from "react";
import { FormikProps, useField } from "formik";
import styled from "styled-components";

type MyFieldProps = React.InputHTMLAttributes<any> & {
  // You can add more input types here
  as?: "radio" | "input" | "select" | "radio" | "checkbox" | "textarea";
  name: string;
  formData?: FormikProps<any>;
};

function TimeField(props: MyFieldProps) {
  const [field, meta] = useField(props.name);

  return <Field value={meta.value} onChange={field.onChange} {...props} />;
}

export default TimeField;

const Field = styled.input`
  border: none;
  color: ${({ theme }) => theme.colors.PRIMARY_DARK};
  width: 20%;

  &:hover,
  &:focus {
    outline: none;
  }
`;
