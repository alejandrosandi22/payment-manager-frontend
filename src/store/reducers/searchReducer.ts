import { createSlice } from "@reduxjs/toolkit";
import { ClientsType } from "../../types";

type State = {
  status: boolean;
  searchResults: ClientsType[] | null;
};

type Action = {
  type: string;
  payload: any;
};

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: false,
    searchResults: [],
  },
  reducers: {
    setSearch: (_state: State, action: Action) => action.payload,
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
