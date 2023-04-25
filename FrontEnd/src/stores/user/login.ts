import { createSlice } from "@reduxjs/toolkit";

interface loginState {
  email: string;
  password: string;
}

const initialState: loginState = {
  email: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload.email;
    },
    setPassword(state, action) {
      state.password = action.payload.password;
    },
  },
});

export const { setPassword, setEmail } = loginSlice.actions;

export default loginSlice.reducer;
