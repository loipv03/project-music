import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSong, infoSong } from "../../api/music";

const initialState = {
  curSongId: "",
  audio: {},
  detailSong: {},
};

export const getDetailSong = createAsyncThunk(
  "audio/getDetailSong",
  async (encodeId: string) => {
    try {
      const { data: songInfo } = await infoSong(encodeId);
      const { data: audio } = await getSong(encodeId);
      if (audio?.err == 0) {
        return {
          audio,
          songInfo,
        };
      }
    } catch (error) {
      throw error;
    }
  }
);

const controlSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetailSong.fulfilled, (state, action: any) => {
      if (action.payload) {
        state.curSongId = action.payload.songInfo.data.encodeId;
        state.audio = action.payload.audio;
        state.detailSong = action.payload.songInfo;
      }
    });
  },
});

export default controlSlice.reducer;
