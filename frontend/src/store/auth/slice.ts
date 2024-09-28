import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  authToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  authToken: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.authToken = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
