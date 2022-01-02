import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, User, Auth } from 'firebase/auth';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser: null | User;
  authError: null | SerializedError;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  currentUser: null,
  authError: null
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
    const data = res.user.toJSON() as User;
    return { data };
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestSignIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestSignIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload.data;
    });
    builder.addCase(requestSignIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.authError = action.error;
    });
  }
});

export default authSlice.reducer;
