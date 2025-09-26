import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  theme: "light" | "dark";
  loading: boolean;
  mobileMenuOpen: boolean;
  notification: string | null;
}

const initialState: UIState = {
  theme: "light",
  loading: false,
  mobileMenuOpen: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    showNotification: (state, action: PayloadAction<{ message: string; type: string }>) => {
      state.notification = action.payload.message; // or store the object if needed
    },
  },
});

export const { setTheme, setLoading, toggleMobileMenu, showNotification } = uiSlice.actions;
export default uiSlice.reducer;
