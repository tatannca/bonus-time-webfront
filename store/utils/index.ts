import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { endpoints } from '../../utils/api';
import { apiFactory } from '../../utils/axiosSettings';

type UtilsState = {
  isLoading: boolean;
  publicMessage: string | null;
  privateMessage: string | null;
  utilsError: {
    err: string;
  } | null;
};
const initialState: UtilsState = {
  isLoading: false,
  publicMessage: '',
  privateMessage: '',
  utilsError: null
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // public
    builder.addCase(getPublicMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPublicMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.publicMessage = action.payload.data.message;
    });
    builder.addCase(getPublicMessage.rejected, (state, action) => {
      state.isLoading = false;
      state.utilsError = action.payload as { err: string };
    });
    // private
    builder.addCase(getPrivateMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPrivateMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.privateMessage = action.payload.data.message;
    });
    builder.addCase(getPrivateMessage.rejected, (state, action) => {
      state.isLoading = false;
      state.utilsError = action.payload as { err: string };
    });
  }
});

export const getPublicMessage = createAsyncThunk('utils/getPublicMessage', async (_, thunkAPI) => {
  try {
    const res = await apiFactory<{ message: string }>('get', endpoints.public());
    const data = res.data;
    return { data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue({ err: err.message });
    }
    return thunkAPI.rejectWithValue({ err: err.message });
  }
});

export const getPrivateMessage = createAsyncThunk('utils/getPrivateMessage', async (_, thunkAPI) => {
  try {
    const res = await apiFactory<{ message: string }>('get', endpoints.private());
    const data = res.data;
    return { data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue({ err: err.response?.data });
    }
    return thunkAPI.rejectWithValue({ err: err.message });
  }
});

export default utilsSlice.reducer;
