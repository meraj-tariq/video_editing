import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import AppAlert from "../../Components/AppAlert";

import {
  FormField,
  FormFieldToggle,
  UserCredentialsForm,
} from "../../Components/Forms";
import { postUserDetails } from "../../Store/Actions/UserReg";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("Full Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Register(props: any) {
  const dispatch = useDispatch();

  const { alert, error, isLoading } = useSelector((state) => state.UserReg);

  const handleSubmit = (values: any) => {
    dispatch(postUserDetails(values));
  };
  return (
    <Container>
      <UserCredentialsForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values: any) => handleSubmit(values)}
        validationSchema={validationSchema}
        title="Sign Up"
        subTitle="Create an account!"
        buttonTitle={isLoading ? "loading..." : "Sign Up"}
        buttonDisabled={isLoading}
        accountMessage="Already have an account?"
        accountLinkTitle="Sign In"
        accountLink="/login"
        alert={
          <AppAlert
            open={alert}
            msg="Account created successfully"
            error={error?.message}
          />
        }
      >
        <FormField
          id="name"
          label="Full Name"
          name="name"
          placeholder="eg. John Doe"
          type="text"
        />
        <FormField
          id="email"
          label="Email Address"
          name="email"
          placeholder="example@email.com"
          type="email"
        />

        <FormFieldToggle />
      </UserCredentialsForm>
    </Container>
  );
}
export default Register;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: transparent linear-gradient(172deg, #035e73 0%, #022f3a 100%) 0%
    0% no-repeat padding-box;
  opacity: 1;
`;
