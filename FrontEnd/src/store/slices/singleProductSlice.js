import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleProduct = createAsyncThunk('singleProduct/fetchSingleProduct', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/products/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSingleProduct.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => { state.loading = false; state.product = action.payload; })
      .addCase(fetchSingleProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export default singleProductSlice.reducer; 