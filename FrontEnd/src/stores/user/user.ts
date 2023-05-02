import { createSlice } from "@reduxjs/toolkit";

interface userState {
  name: string;
}

const initialState: userState = {
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },

    logout(state) {
      state.name = "";
    },
  },
});

export const { setName, logout } = userSlice.actions;

export default userSlice.reducer;
