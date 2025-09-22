import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { loginUser, registerUser } from "@/services/api"; // <-- use services/api.ts

// === Types ===
export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthResponse = {
  user: User;
  access: string; // JWT access token
  refresh?: string;
};

interface UserState {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// === Persistence helpers ===
const loadAuth = (): { user: User | null; token: string | null } => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
    };
  }
  return { user: null, token: null };
};

const saveAuth = (user: User, token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }
};

const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};

// === Initial State ===
const { user: loadedUser, token: loadedToken } = loadAuth();

const initialState: UserState = {
  currentUser: loadedUser,
  token: loadedToken,
  loading: false,
  error: null,
};

// === Async thunks ===
export const loginThunk = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data as AuthResponse;
    } catch (err: any) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const registerThunk = createAsyncThunk<
  AuthResponse,
  { name: string; email: string; password: string }
>(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data as AuthResponse;
    } catch (err: any) {
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

// === Slice ===
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      saveAuth(action.payload.user, action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      clearAuth();
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.access;
      saveAuth(action.payload.user, action.payload.access);
      state.loading = false;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.error = (action.payload as string) || "Login failed";
      state.loading = false;
    });

    // Register
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.access;
      saveAuth(action.payload.user, action.payload.access);
      state.loading = false;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.error = (action.payload as string) || "Registration failed";
      state.loading = false;
    });
  },
});

// === Exports ===
export const { setUser, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;
export const selectToken = (state: RootState) => state.user.token;
export const selectAuthLoading = (state: RootState) => state.user.loading;
export const selectAuthError = (state: RootState) => state.user.error;

export default userSlice.reducer;
