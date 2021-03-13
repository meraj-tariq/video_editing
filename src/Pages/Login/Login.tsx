import React from "react";
import * as Yup from "yup";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { fetchLoginDetails } from "../../Store/Actions/Auth";
import { useHistory } from "react-router-dom";

import {
  FormField,
  FormFieldToggle,
  UserCredentialsForm,
} from "../../Components/Forms";
import AppAlert from "../../Components/AppAlert";
// import Cookies from "universal-cookie";
import Cookie from "../../Services/Cookie";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Login(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { alert, error, isLoading } = useSelector((state) => state.Auth);

  const handleLogin = (values: any) => {
    dispatch(
      fetchLoginDetails({
        onSuccess: () => {
          history.push("/create-project");
          Cookie.set("veegic-mail", values?.email);
        },
        ...values,
      })
    );
  };

  return (
    <Container>
      <UserCredentialsForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: any) => handleLogin(values)}
        validationSchema={validationSchema}
        title="Sign In"
        subTitle="Welcome!"
        buttonTitle={isLoading ? "loading..." : "Sign In"}
        buttonDisabled={isLoading}
        accountMessage="Don't have an account?"
        accountLinkTitle="Register"
        accountLink="/register"
        alert={
          <AppAlert
            open={alert}
            msg="login successfully"
            error={error?.message}
          />
        }
      >
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
export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: transparent linear-gradient(172deg, #035e73 0%, #022f3a 100%) 0%
    0% no-repeat padding-box;
  opacity: 1;
`;
