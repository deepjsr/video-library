import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  video: [],
  vidoeCount: 0,
};

const videoSlicer = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    addToViewLater: (state, action) => {
      state.video.push(action.payload);
      state.vidoeCount = state.video.length;
    },
  },
});

export const { addToViewLater } = videoSlicer.actions;
export default videoSlicer.reducer;
