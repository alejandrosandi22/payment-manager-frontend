import { createSlice } from "@reduxjs/toolkit";
import { ClientsType } from "../../types";

type action = {
  type: string;
  payload: ClientsType[];
};

export const listSlice = createSlice({
  name: "list",
  initialState: [
    {
      id: 0,
      name: "",
      payment: 0,
    },
  ],
  reducers: {
    setList: (_state: ClientsType[], action: action) => action.payload,
  },
});

export const { setList } = listSlice.actions;

export default listSlice.reducer;
