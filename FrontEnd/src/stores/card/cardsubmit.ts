import { createSlice } from "@reduxjs/toolkit";

interface cardState {
  card: {
    cardinal: string;
    campus: string;
    content: string;
    company: string;
    grade: string;
    field: string;
    github: string;
    blog: string;
    content2: string;
    etc: string;
    boj: string;
    ban: string;
    track: string;
    major: string;
  };
}

const initialState: cardState = {
  card: {
    ban: "",
    cardinal: "",
    campus: "",
    content: "",
    company: "",
    grade: "",
    field: "",
    github: "",
    blog: "",
    content2: "",
    etc: "",
    boj: "",
    track: "",
    major: "",
  },
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCard(state, action) {
      state.card = action.payload;
    },
    resetCard(state) {
      state.card = {
        ban: "",
        cardinal: "",
        campus: "",
        content: "",
        company: "",
        grade: "",
        field: "",
        github: "",
        blog: "",
        content2: "",
        etc: "",
        boj: "",
        track: "",
        major: "",
      };
    },
  },
});

export const { setCard, resetCard } = cardSlice.actions;

export default cardSlice.reducer;
