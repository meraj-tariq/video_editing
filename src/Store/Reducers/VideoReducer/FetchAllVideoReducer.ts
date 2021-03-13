import { createReducer } from "@reduxjs/toolkit";
import { TVideo } from "../../../Types/Video";
import * as VideoActions from "../../Actions/VideoAction";

export interface TVideoState {
  videos: TVideo[];
  isVideoLoading: boolean;
  error?: Error;
}

const initialState: TVideoState = {
  videos: [],
  isVideoLoading: false,
};

const VideoReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(VideoActions.fetchAllVideos, (state) => {
      state.isVideoLoading = true;
    })
    .addCase(VideoActions.fetchAllVideosSuccess, (state, action) => {
      state.videos = action.payload.videos;
      state.isVideoLoading = false;
    })
    .addCase(VideoActions.fetchAllVideosError, (state, action) => {
      state.isVideoLoading = false;
      state.error = action.payload.error;
    })
);

export default VideoReducer;
