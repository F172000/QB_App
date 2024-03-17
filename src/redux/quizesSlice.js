import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getQuizes } from "./quizesThunk";

const initialState = {
  quizes: null,
  loading: false,
  error: null,
};

export const quizesSlice = createSlice({
  name: "quizes",
  initialState,
  reducers: {
    setQuizes: (state, action) => {
      state.quizes = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuizes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizes = action.payload;
      })
      .addCase(getQuizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {setQuizes} =quizesSlice.actions;
export default quizesSlice.reducer;
