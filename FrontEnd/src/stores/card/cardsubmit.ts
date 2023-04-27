import { createSlice } from "@reduxjs/toolkit";

interface cardState {
  name: string;
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
  };
}

const initialState: cardState = {
  name: "",
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
  },
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setCard(state, action) {
      state.card = action.payload;
    },
  },
});

export const { setCard, setName } = cardSlice.actions;

export default cardSlice.reducer;
