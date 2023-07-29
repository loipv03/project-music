import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHome } from "../../api/music";

const initialState = {
  audio: {},
};

export const getAudioHome = createAsyncThunk("audio/getHome", async () => {
  try {
    const { data } = await getHome();
    return data;
  } catch (error) {
    throw error;
  }
});

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAudioHome.fulfilled, (state, action) => {
      state.audio = action.payload;
    });
  },
});

export default audioSlice.reducer;
