import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  opacity: "0",
};

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setOpacity: (state, action: PayloadAction<string>) => {
      state.opacity = action.payload;
    },
  },
});

export default notification.reducer;
export const { setOpacity } = notification.actions;
