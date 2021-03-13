import React from "react";
import { useFormikContext } from "formik";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

import { Button } from "../../Styles";

type TStyleProps = {
  width?: string;
  margin?: string;
};

type Props = {
  title: string;
  disabled?: boolean;
  width?: string;
  margin?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  loader?: string;
  onClick?: any;
};
function SubmitButton({
  title,
  disabled,
  width,
  margin,
  isLoading,
  type,
  loader,
  onClick,
}: Props) {
  const { handleSubmit } = useFormikContext();

  return (
    <StyledButton
      disabled={disabled}
      width={width}
      margin={margin}
      type={type ?? "submit"}
      onClick={onClick ?? handleSubmit}
    >
      {isLoading ? loader ?? <ButtonLoader size={15} /> : title}
    </StyledButton>
  );
}

export default SubmitButton;

const StyledButton = styled(Button)<TStyleProps>`
  width: ${({ width }) => width ?? "100%"};
  margin: ${({ margin }) => margin ?? 0};
`;

const ButtonLoader = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    .MuiCircularProgress-svg {
      color: ${({ theme }) => theme.colors.WHITE};
    }
  }
`;
