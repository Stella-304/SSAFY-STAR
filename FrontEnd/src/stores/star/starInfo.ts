import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface starInfoState {
  userInfoList: User[];
  userInfoPreview: User | null;
  starEdgeList: any[];
  viewCard: boolean;
  filterOpen: boolean;
  hoverStarPosition: THREE.Vector3 | null;
  groupInfoList: any[];
}

const initialState: starInfoState = {
  userInfoList: [],
  userInfoPreview: null,
  starEdgeList: [],
  viewCard: false,
  filterOpen: false,
  hoverStarPosition: null,
  groupInfoList: [],
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
    setViewCard(state, action) {
      state.viewCard = action.payload;
    },
    setFilterTabOpen(state, action) {
      state.filterOpen = action.payload;
    },
    setHoverStarPosition(state, action) {
      state.hoverStarPosition = action.payload;
    },
    setGroupInfoList(state, action) {
      state.groupInfoList = action.payload;
    },
  },
});

export const {
  setStarInfo,
  setStarInfoPreview,
  setStarEdgeList,
  setViewCard,
  setFilterTabOpen,
  setHoverStarPosition,
  setGroupInfoList,
} = starInfoSlice.actions;

export default starInfoSlice.reducer;
