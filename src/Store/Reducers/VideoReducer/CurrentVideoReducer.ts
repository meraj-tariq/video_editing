import { createReducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { currentVideo } from "../../Actions/VideoAction";

type TVideo = {
  url: string;
};

const initialState: TVideo = {
  url: "",
};

const VideoReducer = createReducer(initialState, (builder) =>
  builder.addCase(currentVideo, (state, action) => {
    state.url = action.payload.video;
  })
);

export default persistReducer(
  {
    key: "videoContent",
    storage,
  },
  VideoReducer
);
