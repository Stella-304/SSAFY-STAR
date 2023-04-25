import { createSlice } from "@reduxjs/toolkit";

interface signupState {
  email: string;
  name: string;
  password: string;
  password2: string;
}

const initialState: signupState = {
  email: "",
  name: "",
  password: "",
  password2: "",
};

const loginSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload.email;
    },
    setName(state, action) {
      state.name = action.payload.name;
    },
    setPassword(state, action) {
      state.password = action.payload.password;
    },
    setPassword2(state, action) {
      state.password2 = action.payload.password2;
    },
    deleteMemberInfo(state) {
      state.email = "";
      state.name = "";
      state.password = "";
      state.password2 = "";
    },
  },
});

export const { setName, setPassword2, setPassword, setEmail } =
  loginSlice.actions;

export default loginSlice.reducer;
