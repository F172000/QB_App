
  import { createAsyncThunk } from "@reduxjs/toolkit";
export const getQuizQuestions  = createAsyncThunk(
    "quizQuestion/getQuizQuestions", async (Questions , { rejectWithValue, dispatch }) => {
      try {
        console.log(Questions,"Questions in thunk");
      if(Questions.length>0){
        return Questions;
      }
      else{
            return rejectWithValue("No Questions Found");
      }
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message || "Error fetching Quiz Questions");
      }
    }
  );