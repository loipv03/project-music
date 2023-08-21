import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlayList } from "../../api/music";

const initialState = {
  playList: {},
};

export const getDetaiPlayList = createAsyncThunk(
  "audio/getDetailPlayList",
  async (encodeId: string) => {
    try {
      const { data } = await getPlayList(encodeId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const playListSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetaiPlayList.fulfilled, (state, action: any) => {
      if (action.payload) {
        state.playList = action.payload.data;
      }
    });
  },
});

export default playListSlice.reducer;
