import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface starInfoState {
  userInfoList: User[];
  userInfoPreview: User | null;
}

const initialState: starInfoState = {
  userInfoList: [],
  userInfoPreview: null,
};

const starInfoSlice = createSlice({
  name: "starInfo",
  initialState,
  reducers: {
    setStarInfo(state, action) {
      state.userInfoList = action.payload;
    },
    setStarInfoPreview(state, action) {
      state.userInfoPreview = action.payload;
    },
  },
});

export const { setStarInfo, setStarInfoPreview } = starInfoSlice.actions;

export default starInfoSlice.reducer;
