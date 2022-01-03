import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, User, Auth } from 'firebase/auth';

export interface AuthState {
  isLoading: boolean;
  currentUser: null | User;
  authError: null | SerializedError;
}

const initialState: AuthState = {
  isLoading: false,
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
  } catch (err: any) {
    if (err.code || err.message) {
      const { code, message } = err;
      return thunkAPI.rejectWithValue({ code, message });
    }
    return thunkAPI.rejectWithValue(err);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpAuthStart: (state) => {
      state.isLoading = true;
    },
    signUpAuthSucceed: (state, action: PayloadAction<{ user: User }>) => {
      state.isLoading = false;
      state.currentUser = action.payload.user;
      state.authError = null;
    },
    catchErrorAuth: (state, action) => {
      state.isLoading = false;
      state.authError = action.payload;
    },
    resetAuth: (state) => {
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(requestSignIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestSignIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.data;
      state.authError = null;
    });
    builder.addCase(requestSignIn.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.authError = action.payload as SerializedError;
      } else {
        state.authError = action.error;
      }
    });
  }
});

export const { resetAuth, signUpAuthStart, signUpAuthSucceed, catchErrorAuth } = authSlice.actions;
export default authSlice.reducer;
