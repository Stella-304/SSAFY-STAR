import { createSlice } from "@reduxjs/toolkit";

interface pathState {
  path: string;
}

const initialState: pathState = {
  path: "",
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPath(state, action) {
      state.path = action.payload;
    },
  },
});

export const { setPath } = pathSlice.actions;

export default pathSlice.reducer;
