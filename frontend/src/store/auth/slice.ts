import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface User {
    id: string;
    email: string;
}

interface AuthState {
  loading: boolean,
  isAuthenticated: boolean;
  authToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  authToken: null,
  user: null,
}

interface Credentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk<string, Credentials, { rejectValue: string }>(
  'auth/login',
  async (loginData : Credentials, thunkAPI) => {
    try {
      console.log('logging in user', loginData)
      // send request to the backend which will return access token in response
      return 'access-token-123'
    } catch (error: Error | any) {
      // axios will throw error.response.data
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
        state.loading =false
        state.authToken = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        // state.error = action.payload // can store error here if it needs to be displayed
      });
  },
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;
