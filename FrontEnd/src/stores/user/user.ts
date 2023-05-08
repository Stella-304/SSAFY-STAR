import { createSlice } from "@reduxjs/toolkit";

interface userState {
  name: string;
  nickname: string;
  email: string;
  authorized: boolean;
  cardRegistered: boolean;
}

const initialState: userState = {
  name: "",
  nickname: "",
  email: "",
  authorized: false,
  cardRegistered: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.authorized = action.payload.authorized;
      state.cardRegistered = action.payload.cardRegistered;
    },
    logout(state) {
      state.name = "";
      state.nickname = "";
      state.email = "";
      state.authorized = false;
      state.cardRegistered = false;
      sessionStorage.removeItem("accessToken"); //토큰제거
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
