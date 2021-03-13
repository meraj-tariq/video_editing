/* eslint-disable no-underscore-dangle */
import { put, call } from 'redux-saga/effects';
import {
	postUserDetails,
	postUserDetailsError,
	postUserDetailsSuccess,
} from '../Actions/UserReg';

import { takeLatest } from 'redux-saga/effects';
import Auth from '../../Services/AuthService';
import Notify from '../Actions/NotifyAction';

function* postUserDetailsSaga(action: ReturnType<typeof postUserDetails>) {
	try {
		yield call(Auth.userRegService, { ...action.payload });

		yield put(postUserDetailsSuccess());
	} catch (error) {
		yield put(
			postUserDetailsError({
				error,
			})
		);
		yield put(Notify.error(error.message));
	}
}

export default function* UserRegSaga() {
	yield takeLatest(postUserDetails, postUserDetailsSaga);
}
