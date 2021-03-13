import React from "react";
import styled from "styled-components";

import { StyledLink } from "../StyledLink";
import { Form, SubmitButton } from "../../Components/Forms";

function UserCredentialsForm({
  initialValues,
  onSubmit,
  validationSchema,
  title,
  subTitle,
  buttonTitle,
  children,
  accountLinkTitle,
  accountLink,
  accountMessage,
  alert,
  buttonDisabled,
}: any) {
  return (
    <Wrapper>
      <Brand>
        {/* <Logo>V</Logo> */}

        <StyledLink to="/">
          <BrandName>Veegic</BrandName>
        </StyledLink>
      </Brand>
      {alert}
      <FormCard>
        <TitleWrapper>
          <Title>{title}</Title>
          <Desc>{subTitle}</Desc>
        </TitleWrapper>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {children}
          <SubmitButton title={buttonTitle} disabled={buttonDisabled} />
          <Account>
            {accountMessage}{" "}
            <StyledLink to={accountLink ? accountLink : "/"}>
              <AccountType>{` ${accountLinkTitle}`}</AccountType>
            </StyledLink>
          </Account>
        </Form>
      </FormCard>
    </Wrapper>
  );
}
export default UserCredentialsForm;

const Wrapper = styled.div`
  max-width: 400px;
  margin: auto;
  height: calc(100vh - (3rem * 2));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const FormCard = styled.div`
  display: grid;
  row-gap: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.S1};
  width: 96%;
  padding: 1rem 3rem 2rem;
  border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.DANGER};
`;

const TitleWrapper = styled.div`
  margin: 1rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const Desc = styled.p`
  font-size: 16px;
  margin: 0.5rem;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const Brand = styled.div`
  /* font-weight: bold; */
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.PRIMARY};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${({ theme }) => theme.colors.BUTTON_TEXT};
//   background-color: ${({ theme }) => theme.colors.PRIMARY};
//   padding: 0 0.75rem;
//   font-size: 42px;
// `;

const BrandName = styled.p`
  letter-spacing: 2px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
  color: ${({ theme }) => theme.colors.WHITE};
  letter-spacing: 0px;
  font-size: 40px;
  opacity: 1;
`;

const Account = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const AccountType = styled.div`
  /* color: #068bd8; */
  color: ${({ theme }) => theme.colors.PRIMARY};
  margin-left: 4px;
`;
