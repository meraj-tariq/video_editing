/* eslint-disable no-debugger */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAllVideos,
  fetchAllVideosSuccess,
  fetchAllVideosError,
} from "../Actions/VideoAction";
import { getAllVideosService } from "../../Services/Video";
import Notify from "../Actions/NotifyAction";

function* fetchAllVideosSaga() {
  try {
    const response = yield call(getAllVideosService);

    yield put(
      fetchAllVideosSuccess({
        videos: response,
      })
    );
  } catch (error) {
    yield put(
      fetchAllVideosError({
        error,
      })
    );
    yield put(Notify.error(error.message));
  }
}

function* videoSaga() {
  yield takeLatest(fetchAllVideos, fetchAllVideosSaga);
}

export default videoSaga;
