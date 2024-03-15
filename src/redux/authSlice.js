import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { SignInUser } from "./AuthThunk";

const initialState = {
  user: null,
  authLoading: false,
  error: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignInUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(SignInUser.fulfilled, (state, action) => {
        toast.success("Signin Sucessfully.");
        state.authLoading = false;
        state.user = action.payload;
      })
      .addCase(SignInUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { PASSWORD_LOADER } = authSlice.actions;
export default authSlice.reducer;
