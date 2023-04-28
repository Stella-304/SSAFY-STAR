import { createSlice } from "@reduxjs/toolkit";

interface loginState {
  loginid: string;
  password: string;
}

const initialState: loginState = {
  loginid: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginid(state, action) {
      state.loginid = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    resetLogin(state) {
      state.loginid = "";
      state.password = "";
    },
  },
});

export const { setPassword, setLoginid, resetLogin } = loginSlice.actions;

export default loginSlice.reducer;
