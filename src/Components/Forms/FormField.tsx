import React from "react";
import { useFormikContext } from "formik";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

type TInputStyleProps = { height: string; padding: string; margin: string };

function AppFormField({
  name,
  width,
  label,
  height,
  padding,
  margin,
  ...otherProps
}: any) {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
  }: any = useFormikContext();

  return (
    <Wrapper>
      {label && <Label htmlFor={otherProps?.id}>{label}</Label>}
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        width={width}
        {...otherProps}
        margin={margin}
        padding={padding}
        height={height}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Wrapper>
  );
}

export default AppFormField;

const TextInput = styled.input<TInputStyleProps>`
  height: ${({ height }) => height ?? "1.75rem"};
  padding: ${({ padding }) => padding ?? "0.5rem"};
  margin: ${({ margin }) => margin};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  outline: none;
  box-shadow: none;

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.S2};
    border: 1px solid ${({ theme }) => theme.colors.TRANSPARENT};
    transition: box-shadow 0.3s linear;
  }
`;
const Label = styled.label`
  padding: 0.15rem;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;
const Wrapper = styled.div`
  display: grid;
  row-gap: 0.25rem;
`;
