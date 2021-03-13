/* eslint-disable no-underscore-dangle */
import { put, call } from "redux-saga/effects";
import environment from "../../Config/Environment";
import {
  fetchLoginDetails,
  fetchLoginDetailsError,
  fetchLoginDetailsSuccess,
  fetchUserDetails,
  fetchUserDetailsError,
  fetchUserDetailsSuccess,
  logoutAction,
} from "../Actions/Auth";

import cookieService from "../../Services/Cookie";

import { takeLatest } from "redux-saga/effects";
import Auth from "../../Services/AuthService";
import Notify from "../Actions/NotifyAction";

function* fetchUserDetailsSaga() {
  try {
    const response = yield call(Auth.getUserInfoService);

    yield put(
      fetchUserDetailsSuccess({
        user_info: response,
      })
    );
  } catch (error) {
    yield put(
      fetchUserDetailsError({
        error,
      })
    );
    yield put(Notify.error(error.message));
  }
}

function* fetchLoginDetailsSaga(action: ReturnType<typeof fetchLoginDetails>) {
  try {
    const response = yield call(Auth.loginService, { ...action.payload });

    yield put(
      fetchLoginDetailsSuccess({
        access_token: response.api_token,
      })
    );

    if (response.api_token) {
      cookieService.set(
        cookieService.TOKEN(),
        response.api_token,
        cookieService.DEFAULT_CUSTOM_OPTIONS
      );

      yield put(fetchUserDetails());
    }

    action.payload.onSuccess?.();
  } catch (error) {
    yield put(
      fetchLoginDetailsError({
        error,
      })
    );
    yield put(Notify.error(error.message));
  }
}

function* logout() {
  //   you can clear your cookies or local storage  here

  try {
    if (["dev", "staging", "production"].includes(environment.name!)) {
      //   you can set your redirect here
    }
  } catch (error) {
    yield put(Notify.error(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(fetchLoginDetails, fetchLoginDetailsSaga);
  yield takeLatest(fetchUserDetails, fetchUserDetailsSaga);
  yield takeLatest(logoutAction, logout);
}
