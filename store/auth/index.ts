import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, onAuthStateChanged, AuthError, User, Auth } from 'firebase/auth';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser: null | User;
  error: null | SerializedError;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  currentUser: null,
  error: null
};

type signInParams = {
  firebaseAuth: Auth;
  email: string;
  password: string;
};

export const requestSignIn = createAsyncThunk('auth/requestSignIn', async (params: signInParams, thunkAPI) => {
  const { firebaseAuth, email, password } = params;
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.isLoading = true;
    },
    authSucceed: (state, action: PayloadAction<User>) => ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
      currentUser: action.payload
    }),
    authFailed: (state, action: PayloadAction<AuthError>) => ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
      error: action.payload
    })
  },
  extraReducers: (builder) => {
    builder.addCase(requestSignIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestSignIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload.user;
    });
    builder.addCase(requestSignIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.error;
    });
  }
});

export const { authStart, authSucceed, authFailed } = authSlice.actions;
export default authSlice.reducer;
