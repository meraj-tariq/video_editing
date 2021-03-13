import React from "react";
import { useSelector } from "react-redux";
import { api } from "../Services/Api";

const AuthHandler = (props: { children: React.ReactNode }) => {
  const token = useSelector((state) => state.Auth.access_token);

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return <>{props.children}</>;
};

export default AuthHandler;
