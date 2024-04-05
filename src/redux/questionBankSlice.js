import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getQuestionBanks,getQuestionBanksById  } from "./questionBankThunk";

const initialState = {
  Banks: null,
  loading: false,
  error: null,
  userBanks:null,
  userbankloading:false,
  usererror:false
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
      })
      .addCase(getQuestionBanksById.pending, (state) => {
        state.userbankloading = true;
        state.usererror = null;
      })
      .addCase(getQuestionBanksById.fulfilled, (state, action) => {
        state.userbankloading = false;
        state.userBanks = action.payload;
      })
      .addCase(getQuestionBanksById.rejected, (state, action) => {
        state.userbankloading = false;
        state.usererror = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export default questionBankSlice.reducer;
