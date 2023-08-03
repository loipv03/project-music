import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getInfoSong, getSong } from "../../api/music";

const initialState = {
  curSongId: "IWB7UDEE",
  infoSong: {},
  audio: "",
  isPlaying: false,
};

export const getDetailSong = createAsyncThunk(
  "audio/getDetailSong",
  async (encodeId: string) => {
    try {
      const { data: infoSong } = await getInfoSong(encodeId);
      return infoSong.err === 0 ? infoSong : null;
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
        state.curSongId = action.payload?.data.encodeId;
        state.infoSong = action.payload?.data;
      }
    });
  },
});

export default controlSlice.reducer;
export const { setIsPlaying, setAudio } = controlSlice.actions;
