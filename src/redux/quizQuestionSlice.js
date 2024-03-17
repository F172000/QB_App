import { createSlice } from "@reduxjs/toolkit";
import { getQuizQuestions } from "./quizQuestionThunk";

const initialState = {
  quizQuestions: null,
  quizQuestionsLoading: false,
  answers:null,
  error: null
};

export const quizQuestionSlice = createSlice({
  name: "quizQuestion",
  initialState,
  reducers: {
    setAnswerState:(state,action)=>{
     state.answers=action.payload;
    },
    resetQuizQuestions: (state) => {
      state.quizQuestions = null;
    },
    resetQuestionsAnswers: (state) => {
      state.answers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizQuestions.pending, (state) => {
        state.quizQuestionsLoading= true;
        state.error = null;
      })
      .addCase(getQuizQuestions.fulfilled, (state, action) => {
        state.quizQuestionsLoading = false;
        state.quizQuestions = action.payload;
      })
      .addCase(getQuizQuestions.rejected, (state, action) => {
        state.quizQuestionsLoading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const  { setAnswerState,resetQuizQuestions, resetQuestionsAnswers} =quizQuestionSlice.actions;
export default quizQuestionSlice.reducer;
