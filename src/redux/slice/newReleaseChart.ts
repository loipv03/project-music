import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNewReleaseChart } from "../../api/music";

const initialState = {
  newReleaseChart: {},
};

export const fetchNewReleaseChart = createAsyncThunk(
  "audio/getNewReleaseChart",
  async () => {
    try {
      const { data } = await getNewReleaseChart();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const newReleaseChartSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewReleaseChart.fulfilled, (state, action: any) => {
      if (action.payload) {
        state.newReleaseChart = action.payload.data;
      }
    });
  },
});

export default newReleaseChartSlice.reducer;
