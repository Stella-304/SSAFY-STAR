import { createSlice } from "@reduxjs/toolkit";

interface cardState {
  card: {
    name: string;
    cardinal: string;
    campus: string;
    email: string;
    content: string;
    job: string;
    grade: string;
    field: string;
    github: string;
    blog: string;
    content2: string;
    etc: string;
    boj: string;
  };
}

const initialState: cardState = {
  card: {
    name: "",
    cardinal: "",
    campus: "",
    email: "",
    content: "",
    job: "",
    grade: "",
    field: "",
    github: "",
    blog: "",
    content2: "",
    etc: "",
    boj: "",
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
        name: "",
        cardinal: "",
        campus: "",
        email: "",
        content: "",
        job: "",
        grade: "",
        field: "",
        github: "",
        blog: "",
        content2: "",
        etc: "",
        boj: "",
      };
    },
  },
});

export const { setCard, resetCard } = cardSlice.actions;

export default cardSlice.reducer;
