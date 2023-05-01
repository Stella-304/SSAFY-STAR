import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loginSlice from "./user/login";
import signupSlice from "./user/signup";
import cardSlice from "./card/cardsubmit";
import findSlice from "./user/find";
const reducers = combineReducers({
  login: loginSlice,
  signup: signupSlice,
  card: cardSlice,
  find: findSlice,
});

const persistConfig = {
  timeout: 100,
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
