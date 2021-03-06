import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User, Auth } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';

interface AuthState {
  isLoading: boolean;
  currentUser: User | null | undefined;
  authError: SerializedError | null;
}

const initialState: AuthState = {
  isLoading: false,
  currentUser: null,
  authError: null
};

type CredentialParams = {
  firebaseAuth: Auth;
  email: string;
  password: string;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<{ user: User | null }>) => {
      state.currentUser = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    // signUp
    builder.addCase(requestSignUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestSignUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.data;
      state.authError = null;
    });
    builder.addCase(requestSignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.authError = action.error;
    });
    // signIn
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
    // signOut
    builder.addCase(requestSignOut.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestSignOut.fulfilled, (state) => {
      state.isLoading = false;
      state.currentUser = null;
    });
    builder.addCase(requestSignOut.rejected, (state, action) => {
      state.isLoading = false;
      state.authError = action.payload as SerializedError;
    });
  }
});

export const requestSignUp = createAsyncThunk('auth/requestSignUp', async (params: CredentialParams, thunkAPI) => {
  const { firebaseAuth, email, password } = params;
  try {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const data = res.user.toJSON() as User;
    await firebaseAuth.onIdTokenChanged(async (user) => {
      if (user) {
        const accessToken = await user.getIdToken();
        window.localStorage.setItem('access_token', accessToken);
      }
    });
    return { data };
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const requestSignIn = createAsyncThunk('auth/requestSignIn', async (params: CredentialParams, thunkAPI) => {
  const { firebaseAuth, email, password } = params;
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const data = res.user.toJSON() as User;
    await firebaseAuth.onIdTokenChanged(async (user) => {
      if (user) {
        const accessToken = await user.getIdToken();
        window.localStorage.setItem('access_token', accessToken);
      }
    });
    return { data };
  } catch (err: any) {
    if (err.code || err.message) {
      const { code, message } = err;
      return thunkAPI.rejectWithValue({ code, message });
    }
    return thunkAPI.rejectWithValue(err);
  }
});

export const requestSignOut = createAsyncThunk('auth/requestSignOut', async (_, thunkAPI) => {
  try {
    await firebaseAuth.signOut();
    window.localStorage.removeItem('access_token');
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
