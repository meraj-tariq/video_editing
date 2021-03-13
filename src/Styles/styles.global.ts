import styled from "styled-components";

const Button = styled.button<{ onClick?: any; width?: string, margin?:string }>`
  background: ${({ theme }) => theme.colors.PRIMARY};
  /* padding: 17px 39.5px; for normal font-size */
  height: 40px;
  width: ${({ width }) => width ?? "138px"};
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  border: none;
  color: ${({ theme }) => theme.colors.BUTTON_TEXT};
  cursor: pointer;
  margin:  ${({ margin }) => margin ?? "0.5rem"};;
  font-size: 14px;
  outline: none;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.S2};
    transition: all 0.3s linear;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.SECONDARY};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.GREY};
    cursor: default;
  }

  @media ${({ theme }) => theme.screens.LARGE_MOBILE} {
    height: 33px;
    
  }
`;

export { Button };
