import { createReducer } from '@reduxjs/toolkit';
import {
	postUserDetailsSuccess,
	postUserDetails,
	postUserDetailsError,
} from '../Actions/UserReg';

type TUserRegState = {
	isLoading: boolean;
	error?: Error;
	alert?: boolean;
};

const initialState: TUserRegState = {
	isLoading: false,
};

const UserRegReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(postUserDetails, (state) => {
			state.isLoading = true;
			state.alert = false;
			state.error = undefined;
		})
		.addCase(postUserDetailsError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
			state.alert = true;
		})
		.addCase(postUserDetailsSuccess, (state) => {
			state.isLoading = false;
			state.alert = true;
		})
);

export default UserRegReducer;
