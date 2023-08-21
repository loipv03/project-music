import { combineReducers, configureStore } from "@reduxjs/toolkit";
import audioSlice from "./slice/audio";
import controlSlice from "./slice/playerControl";
import playListSlice from "./slice/playlist";
import notification from "./slice/notification";
import top100Slide from "./slice/top100";
import newReleaseChartSlice from "./slice/newReleaseChart";
import searchSlide from "./slice/search";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["control"],
};

const rootReducer = combineReducers({
  audio: audioSlice,
  control: controlSlice,
  playList: playListSlice,
  notification: notification,
  top100: top100Slide,
  newReleaseChart: newReleaseChartSlice,
  search: searchSlide,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export default persistStore(store);
