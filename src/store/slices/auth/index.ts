import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  logout,
  saveUserProfile,
  signinWithEmail,
  signupWithEmail,
} from "./methods";
import { AuthStateType, MyUserType } from "@/src/types/global";

const initialState: AuthStateType = {
  user: null,
  isLoading: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signin
      .addCase(signinWithEmail.pending, (state) => {
        state.isLoading = "SIGN_IN";
      })
      .addCase(
        signinWithEmail.fulfilled,
        (state, action: PayloadAction<MyUserType>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.isLoading = null;
        }
      )
      .addCase(signinWithEmail.rejected, (state) => {
        state.isLoading = null;
      })
      // Signup
      .addCase(signupWithEmail.pending, (state) => {
        state.isLoading = "SIGN_UP";
      })
      .addCase(
        signupWithEmail.fulfilled,
        (state, action: PayloadAction<MyUserType>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.isLoading = null;
        }
      )
      .addCase(signupWithEmail.rejected, (state) => {
        state.isLoading = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = null;
      })
      // Save profile
      .addCase(
        saveUserProfile.fulfilled,
        (state, action: PayloadAction<MyUserType | null>) => {
          if (action.payload) state.user = action.payload;
        }
      );
  },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
