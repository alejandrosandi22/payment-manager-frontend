import { createSlice } from "@reduxjs/toolkit";
import { ClientsType } from "../../types";

type Action = {
  type: string;
  payload: ClientsType;
};

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    id: 0,
    name: "",
    payment: 0,
  },
  reducers: {
    setClient: (_state: ClientsType, action: Action) => action.payload,
  },
});

export const { setClient } = clientSlice.actions;

export default clientSlice.reducer;
