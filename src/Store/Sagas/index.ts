import { spawn } from "redux-saga/effects";
import AuthSaga from "./AuthSaga";
import UserRegSaga from "./UserRegSaga";
import VideoSaga from "./VideosSaga";

function* rootSaga() {
  yield spawn(AuthSaga);
  yield spawn(UserRegSaga);
  yield spawn(VideoSaga);
}

export default rootSaga;
