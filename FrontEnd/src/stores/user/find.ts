import { createSlice } from "@reduxjs/toolkit";

interface findState {
  loginid: string;
  email: string;
  email2: string;
}

const initialState: findState = {
  loginid: "",
  email: "",
  email2: "",
};

const findSlice = createSlice({
  name: "find",
  initialState,
  reducers: {
    setLoginid(state, action) {
      state.loginid = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setEmail2(state, action) {
      state.email2 = action.payload;
    },
    resetFind(state) {
      state.loginid = "";
      state.email = "";
      state.email2 = "";
    },
  },
});

export const { setEmail, setEmail2, setLoginid, resetFind } = findSlice.actions;

export default findSlice.reducer;
