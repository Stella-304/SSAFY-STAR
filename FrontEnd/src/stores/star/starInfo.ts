import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface starInfoState {
  userInfoList: User[];
  userInfoPreview: User | null;
  starEdgeList: any[];
}

const initialState: starInfoState = {
  userInfoList: [],
  userInfoPreview: null,
  starEdgeList: [],
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
    setStarEdgeList(state, action) {
      state.starEdgeList = action.payload;
    },
  },
});

export const { setStarInfo, setStarInfoPreview, setStarEdgeList } =
  starInfoSlice.actions;

export default starInfoSlice.reducer;
