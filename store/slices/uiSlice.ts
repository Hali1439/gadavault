import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  loading: boolean;
  notification: {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    visible: boolean;
  };
  mobileMenuOpen: boolean;
}

const initialState: UIState = {
  theme: (typeof window !== 'undefined' && localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  loading: false,
  notification: {
    message: '',
    type: 'info',
    visible: false,
  },
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.classList.toggle('dark', action.payload === 'dark');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    showNotification: (state, action: PayloadAction<{
      message: string;
      type?: UIState['notification']['type'];
    }>) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type || 'info',
        visible: true,
      };
    },
    hideNotification: (state) => {
      state.notification.visible = false;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

export const {
  setTheme,
  setLoading,
  showNotification,
  hideNotification,
  toggleMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;