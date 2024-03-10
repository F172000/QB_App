import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { SignInUser } from "./AuthThunk";

const initialState = {
  user: null,
  authLoading: false,
  error: null,
  isForgetPasswordLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    PASSWORD_LOADER: (state, action) => {
      state.isForgetPasswordLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignInUser.fulfilled, (state, action) => {
        console.log("state signin", action.payload);
        toast.success("Signin Sucessfully.");
        state.loading = false;
        state.user = action.payload;
        window.location.href = "/admin/index";
      })
      .addCase(SignInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { PASSWORD_LOADER } = authSlice.actions;
export default authSlice.reducer;
