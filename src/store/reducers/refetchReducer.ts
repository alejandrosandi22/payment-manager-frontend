import { createSlice } from "@reduxjs/toolkit";

type Action = {
  type: string;
  payload: boolean;
};

const refetchSlice = createSlice({
  name: "refetch",
  initialState: false,
  reducers: {
    setRefetch: (_state: boolean, action: Action) => {
      return action.payload;
    },
  },
});

export const { setRefetch } = refetchSlice.actions;
export default refetchSlice.reducer;
