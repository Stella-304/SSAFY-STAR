import { createSlice } from "@reduxjs/toolkit";

interface signupState {
  user: {
    email: string;
    loginid: string;
    name: string;
    password: string;
    password2: string;
  };
}

const initialState: signupState = {
  user: {
    email: "",
    loginid: "",
    name: "",
    password: "",
    password2: "",
  },
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    deleteMemberInfo(state) {
      state.user.loginid = "";
      state.user.email = "";
      state.user.name = "";
      state.user.password = "";
      state.user.password2 = "";
    },
  },
});

export const { setUser } = signupSlice.actions;

export default signupSlice.reducer;
