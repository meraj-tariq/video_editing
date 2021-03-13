import { combineReducers } from "redux";
import CurrentVideoReducer from "./CurrentVideoReducer";
import VideoDimensionReducer from "./VideoDimensionReducer";
import FetchAllVideoReducer from "./FetchAllVideoReducer";

const VideoRootReducer = combineReducers({
  VideoDimensionReducer,
  CurrentVideoReducer,
  FetchAllVideoReducer,
});

export default VideoRootReducer;
