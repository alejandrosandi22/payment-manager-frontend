import { createSlice } from "@reduxjs/toolkit";

type action = {
  type: string;
  payload: boolean;
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState: true,
  reducers: {
    setLoading: (_state: boolean, action: action) => action.payload,
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
