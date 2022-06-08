import { createSlice } from "@reduxjs/toolkit";

type action = {
  type: string;
  payload: {
    state: boolean;
    type: string;
  };
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    state: false,
    type: "add",
  },
  reducers: {
    setModal: (_state: { state: boolean; type: string }, action: action) =>
      action.payload,
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
