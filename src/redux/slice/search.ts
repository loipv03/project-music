import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSearch } from "../../api/music";

const initialState = {
  search_data: {},
};

export const search = createAsyncThunk("audio/search", async (params: any) => {
  try {
    const { data } = await apiSearch(params);
    return data;
  } catch (error) {
    throw error;
  }
});

const searchSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(search.fulfilled, (state, action: any) => {
      if (action.payload) {
        state.search_data = action.payload.data;
      }
    });
  },
});

export default searchSlice.reducer;
