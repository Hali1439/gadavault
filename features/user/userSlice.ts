import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api, { loginUser, registerUser } from "@/utils/api";
import { User } from "@/types/user";

interface UserState {
  currentUser: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  status: "idle",
};

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }) => {
    return await loginUser(credentials);
  }
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (credentials: { email: string; password: string; name?: string }) => {
    return await registerUser(credentials);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
    restoreSession: (state) => {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        state.currentUser = parsed.user;
        state.token = parsed.token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("auth", JSON.stringify(action.payload));
      })
      .addCase(loginThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(registerThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { setUser, setToken, logout, restoreSession } = userSlice.actions;
export default userSlice.reducer;
