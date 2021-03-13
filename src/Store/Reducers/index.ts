import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import notificationReducer from './NotificationReducer';
import videoReducer from './VideoReducer';
import AuthReducer from './AuthReducer';
import UserRegReducer from './UserRegReducer';

const rootReducer = combineReducers({
	notificationMessage: notificationReducer,
	loadingBar: loadingBarReducer,
	video: videoReducer,
	Auth: AuthReducer,
	UserReg: UserRegReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
