import { createReducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { videoDimensions } from "../../Actions/VideoAction";

type TVideo = {
  width: number | null;
  height: number | null;
  defaultWidth: number | null;
  defaultHeight: number | null;
};

const initialState: TVideo = {
  width: null,
  height: null,
  defaultWidth: null,
  defaultHeight: null,
};

const VideoReducer = createReducer(initialState, (builder) =>
  builder.addCase(videoDimensions, (state, action) => {
    state.width = action.payload.width!;
    state.height = action.payload.height!;
    state.defaultHeight = action.payload.defaultHeight!;
    state.defaultWidth = action.payload.defaultWidth!;
  })
);

export default persistReducer(
  {
    key: "videoContent",
    storage,
  },
  VideoReducer
);
