import { useField } from "formik";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";

interface TMySelectProps<T> extends React.SelectHTMLAttributes<any> {
  getValue: (option: T) => string;
  getName: (option: T) => string;
  options: T[];
  name: string;
  defaultName?: string;
  label?: string;
  margin?: string;
  width?: string;
  wrapMargin?: string;
}

function MySelect<T>(props: TMySelectProps<T>) {
  const {
    getValue,
    getName,
    name,
    options,
    defaultName,
    margin,
    label,
    width,
    wrapMargin,
    ...restProps
  } = props;
  const [selectProps, meta, helpers] = useField<T>(name);

  return (
    <Wrapper wrapMargin={wrapMargin}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        {...restProps}
        {...selectProps}
        value={meta.value ? getValue(meta.value) : ""}
        margin={margin!}
        width={width!}
        onChange={(e) => {
          helpers.setTouched(true);
          helpers.setValue(
            options.find(
              (option) => `${getValue(option)}` === e.currentTarget.value
            )!
          );
          props.onChange?.(e);
        }}
      >
        <option disabled value="">
          {defaultName || restProps.placeholder || ""}
        </option>
        {options?.map((option) => (
          <option key={getValue(option)} value={getValue(option)}>
            {getName(option)}
          </option>
        ))}
      </Select>
      <ErrorMessage error={!!meta.error} visible={meta.touched} />
    </Wrapper>
  );
}

export default MySelect;

const Wrapper = styled.div<{ wrapMargin?: string }>`
  display: grid;
  row-gap: 0.25rem;
  margin: ${({ wrapMargin }) => wrapMargin};
`;

const Select = styled.select<{ margin: string; width: string }>`
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
  background: ${({ theme }) => theme.colors.WHITE};
  padding: 0.5rem;
  outline: none;
  box-shadow: none;
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};

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
