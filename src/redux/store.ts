import { configureStore } from "@reduxjs/toolkit";
import audioSlice from "./slice/audio";
import controlSlice from "./slice/playerControl";
import playListSlice from "./slice/playlist";

const store = configureStore({
  reducer: {
    audio: audioSlice,
    control: controlSlice,
    playList: playListSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
