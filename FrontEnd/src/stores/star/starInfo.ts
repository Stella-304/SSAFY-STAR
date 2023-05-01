import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface starInfoState {
  userInfoList: User[];
}

const initialState: starInfoState = {
  userInfoList: [],
};

const starInfoSlice = createSlice({
  name: "starInfo",
  initialState,
  reducers: {
    setStarInfo(state, action) {
      state.userInfoList = action.payload;
    },
  },
});

export const { setStarInfo } = starInfoSlice.actions;

export default starInfoSlice.reducer;
