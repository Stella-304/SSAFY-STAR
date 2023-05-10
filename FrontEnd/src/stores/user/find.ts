import { createSlice } from "@reduxjs/toolkit";

interface findState {
  email: string;
}

const initialState: findState = {
  email: "",
};

const findSlice = createSlice({
  name: "find",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    resetFind(state) {
      state.email = "";
    },
  },
});

export const { setEmail, resetFind } = findSlice.actions;

export default findSlice.reducer;
