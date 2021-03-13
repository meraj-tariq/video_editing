import { createAction } from '@reduxjs/toolkit';
import { UserRegActionTypes } from './ActionTypes';
import withPayloadType from '../../Utils/WithPayloadType';

export interface TPostUserDetailsPayload {
	name: string;
	email: string;
	password: string;
}

export interface TPostUserDetailsErrorPayload {
	error?: Error;
}

export const postUserDetails = createAction(
	UserRegActionTypes.POST_USER_DETAILS,
	withPayloadType<TPostUserDetailsPayload>()
);
export const postUserDetailsSuccess = createAction(
	UserRegActionTypes.POST_USER_DETAILS_SUCCESS
);

export const postUserDetailsError = createAction(
	UserRegActionTypes.POST_USER_DETAILS_ERROR,
	withPayloadType<TPostUserDetailsErrorPayload>()
);
