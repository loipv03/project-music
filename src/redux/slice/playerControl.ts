import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getInfoSong } from "../../api/music";

const initialState = {
  curSongId: "",
  infoSong: {},
  audio: "",
  isPlaying: false,
};

export const getDetailSong = createAsyncThunk(
  "audio/getDetailSong",
  async (encodeId: string) => {
    try {
      const { data } = await getInfoSong(encodeId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const controlSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setAudio: (state, action) => {
      state.audio = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailSong.fulfilled, (state, action: any) => {
      if (action.payload) {
        // state.curSongId = action.payload?.data.encodeId;
        state.infoSong = action.payload?.data;
      }
    });
  },
});

export default controlSlice.reducer;
export const { setIsPlaying, setAudio } = controlSlice.actions;
