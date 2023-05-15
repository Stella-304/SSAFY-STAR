import { createSlice } from "@reduxjs/toolkit";

interface cardState {
  card: {
    cardId: string; //카드아이디
    name: string; //이름
    ban: string; //1학기 기준 반
    blogAddr: string; //블로그
    bojId: string; //백준아이디
    bojTier: string; //백준티어
    campus: string; //캠퍼스 지역
    company: string; //회사
    content: string; //한마디
    etc: string; //더할말
    generation: string; //기수
    githubId: string; //깃헙주소
    major: string; //전공
    role: string; //FE,BE
    swTier: string; //소프트티어
    track: string; //트랙
  };
}

const initialState: cardState = {
  card: {
    cardId: "", //카드아이디
    name: "", //이름
    ban: "", //1학기 기준 반
    blogAddr: "", //블로그
    bojId: "", //백준아이디
    bojTier: "", //백준티어
    campus: "", //캠퍼스 지역
    company: "", //회사
    content: "", //한마디
    etc: "", //더할말
    generation: "", //기수
    githubId: "", //깃헙주소
    major: "", //전공
    role: "", //FE,BE
    swTier: "", //소프트티어
    track: "", //트랙
  },
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCard(state, action) {
      state.card = action.payload;
    },
    setName(state, action) {
      state.card.name = action.payload;
    },
    resetCard(state) {
      state.card = {
        cardId: "", //카드아이디
        name: "", //이름
        ban: "", //1학기 기준 반
        blogAddr: "", //블로그
        bojId: "", //백준아이디
        bojTier: "", //백준티어
        campus: "", //캠퍼스 지역
        company: "", //회사
        content: "", //한마디
        etc: "", //더할말
        generation: "", //기수
        githubId: "", //깃헙주소
        major: "", //전공
        role: "", //FE,BE
        swTier: "", //소프트티어
        track: "", //트랙
      };
    },
  },
});

export const { setCard, setName, resetCard } = cardSlice.actions;

export default cardSlice.reducer;
