import { createReducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TUserInfo } from "../../Types/User";
import {
  fetchLoginDetailsSuccess,
  fetchLoginDetails,
  logoutAction,
  fetchLoginDetailsError,
  fetchUserDetailsError,
  fetchUserDetailsSuccess,
} from "../Actions/Auth";

type TLoginState = {
  isLoading: boolean;
  access_token: string;
  user_info: TUserInfo | null;
  error?: Error;
  alert?: boolean;
};

const initialState: TLoginState = {
  isLoading: false,
  user_info: null,
  access_token: "",
};

const AuthReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(logoutAction, (state) => initialState)
    .addCase(fetchLoginDetails, (state) => {
      state.isLoading = true;
      state.alert = false;
      state.error = undefined;
    })
    .addCase(fetchLoginDetailsError, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.alert = true;
    })
    .addCase(fetchLoginDetailsSuccess, (state, action) => {
      state.isLoading = false;
      state.access_token = action.payload.access_token;
      // state.user_info = action.payload.user_info;
    })
    .addCase(fetchUserDetailsError, (state, action) => {
      state.error = action.payload.error;
    })
    .addCase(fetchUserDetailsSuccess, (state, action) => {
      state.user_info = action.payload.user_info;
    })
);

const AuthPersistedReducer = persistReducer(
  {
    key: "Auth",
    storage,
  },
  AuthReducer
);

export default AuthPersistedReducer;
