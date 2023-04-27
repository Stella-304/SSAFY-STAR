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
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
});

export const { setPassword, setEmail } = loginSlice.actions;

export default loginSlice.reducer;
