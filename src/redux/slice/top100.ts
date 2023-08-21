import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTop100 } from "../../api/music";

const initialState = {
  top100: [],
};

export const getTop100s = createAsyncThunk("audio/getTop100", async () => {
  try {
    const { data } = await getTop100();
    return data;
  } catch (error) {
    throw error;
  }
});

const top100Slice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTop100s.fulfilled, (state, action: any) => {
      if (action.payload) {
        state.top100 = action.payload.data;
      }
    });
  },
});

export default top100Slice.reducer;
