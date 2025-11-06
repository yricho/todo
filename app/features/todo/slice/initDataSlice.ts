import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const initDataSlice = createSlice({
  name: "initData",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return action.payload;
    },
  },
});

export const { setStatus } = initDataSlice.actions;

export default initDataSlice.reducer;
