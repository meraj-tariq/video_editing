import { createAction } from "@reduxjs/toolkit";
import { AuthActionTypes } from "./ActionTypes";
import withPayloadType, {
  withoutPayloadType,
} from "../../Utils/WithPayloadType";

export interface TFetchLoginDetailsPayload {
  email: string;
  password: string;
  onSuccess?: () => void;
}
export interface TFetchLoginDetailsSuccessPayload {
  access_token: string;
  // user_info: any;
}

export interface TFetchLoginDetailsErrorPayload {
  error?: Error;
}

export interface TFetchUserDetailsSuccessPayload {
  user_info: any;
}

export interface TFetchUserDetailsErrorPayload {
  error?: Error;
}

export const fetchLoginDetails = createAction(
  AuthActionTypes.FETCH_LOGIN_DETAILS,
  withPayloadType<TFetchLoginDetailsPayload>()
);

export const fetchLoginDetailsSuccess = createAction(
  AuthActionTypes.FETCH_LOGIN_DETAILS_SUCCESS,
  withPayloadType<TFetchLoginDetailsSuccessPayload>()
);

export const fetchLoginDetailsError = createAction(
  AuthActionTypes.FETCH_LOGIN_DETAILS_ERROR,
  withPayloadType<TFetchLoginDetailsErrorPayload>()
);

export const fetchUserDetails = createAction(
  AuthActionTypes.FETCH_USER_DETAILS,
  withoutPayloadType()
);

export const fetchUserDetailsSuccess = createAction(
  AuthActionTypes.FETCH_USER_DETAILS_SUCCESS,
  withPayloadType<TFetchUserDetailsSuccessPayload>()
);

export const fetchUserDetailsError = createAction(
  AuthActionTypes.FETCH_USER_DETAILS_ERROR,
  withPayloadType<TFetchUserDetailsErrorPayload>()
);

export const logoutAction = createAction(AuthActionTypes.AUTH_LOGOUT);
