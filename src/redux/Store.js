
import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import CryptoJS from "crypto-js";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";
import questionBankSlice from "./questionBankSlice";
import quizesSlice from "./quizesSlice";
import quizQuestionSlice from "./quizQuestionSlice";

const persistConfig={
  key:"root",
  version:1,
  storage
}
const reducer=combineReducers({
  auth: authSlice,
  questionBanks:questionBankSlice,
  quizes:quizesSlice,
  quizQuestions:quizQuestionSlice
});
const persistedReducer=persistReducer(persistConfig,reducer);
const saveToLocalStorage = (state) => {
  const serializedState = CryptoJS.AES.encrypt(
    JSON.stringify(state),
    "my-secret-key"
  ).toString();
  localStorage.setItem("auth", serializedState);
};

const checkLocalStorage = () => {
  const serializedState = localStorage.getItem("auth");
  if (serializedState === null) return undefined;
  return JSON.parse(
    CryptoJS.AES.decrypt(serializedState, "my-secret-key").toString(
      CryptoJS.enc.Utf8
    )
  );
};
const store = configureStore({
  reducer: persistedReducer,
  preloadedState: checkLocalStorage(),// set the initial state from local storage
});

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;