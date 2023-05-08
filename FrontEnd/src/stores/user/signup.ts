import { createSlice } from "@reduxjs/toolkit";

interface signupState {
  user: {
    email: string;
    name: string;
    nickname: string;
    password: string;
    password2: string;
  };
}

const initialState: signupState = {
  user: {
    email: "",
    nickname: "",
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
    resetUser(state) {
      state.user.email = "";
      state.user.name = "";
      state.user.nickname = "";
      state.user.password = "";
      state.user.password2 = "";
    },
  },
});

export const { setUser, resetUser } = signupSlice.actions;

export default signupSlice.reducer;
