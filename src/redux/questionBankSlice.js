import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getQuestionBanks } from "./questionBankThunk";

const initialState = {
  Banks: null,
  loading: false,
  error: null,
};

export const questionBankSlice = createSlice({
  name: "questionBank",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.Banks = action.payload;
      })
      .addCase(getQuestionBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export default questionBankSlice.reducer;
