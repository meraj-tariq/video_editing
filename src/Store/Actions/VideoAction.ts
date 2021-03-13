import { createAction } from "@reduxjs/toolkit";
import { VideoActionTypes } from "./ActionTypes";
import withPayloadType, {
  withoutPayloadType,
} from "../../Utils/WithPayloadType";
import { TVideo } from "../../Types/Video";

export interface TFetchAllVideosSuccessPayload {
  videos: TVideo[];
}
export interface TFetchAllVideosErrorPayload {
  error: Error;
}

export const currentVideo = createAction(
  VideoActionTypes.CURRENT_VIDEO,
  withPayloadType<{
    video: string;
  }>()
);

export const videoDimensions = createAction(
  VideoActionTypes.VIDEO_DIMENSION,
  withPayloadType<{
    width?: number;
    height?: number;
    defaultWidth?: number;
    defaultHeight?: number;
  }>()
);

export const fetchAllVideos = createAction(
  VideoActionTypes.FETCH_ALL_VIDEOS,
  withoutPayloadType()
);
export const fetchAllVideosSuccess = createAction(
  VideoActionTypes.FETCH_ALL_VIDEOS_SUCCESS,
  withPayloadType<TFetchAllVideosSuccessPayload>()
);
export const fetchAllVideosError = createAction(
  VideoActionTypes.FETCH_ALL_VIDEOS_ERROR,
  withPayloadType<TFetchAllVideosErrorPayload>()
);
