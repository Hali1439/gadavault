import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../utils/api";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthResponse = {
  user: User;
  access: string; // JWT access token
  refresh?: string;
};

type UserState = {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunks
export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }) => {
    const data = await loginUser(credentials);
    return data as AuthResponse;
  }
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (userData: { name: string; email: string; password: string }) => {
    const data = await registerUser(userData);
    return data as AuthResponse;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.access;
        localStorage.setItem("token", action.payload.access);
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
        state.loading = false;
      })
      .addCase(registerThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.access;
        localStorage.setItem("token", action.payload.access);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
