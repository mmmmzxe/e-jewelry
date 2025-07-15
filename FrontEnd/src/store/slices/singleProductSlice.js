import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductByIdApi } from '../../server/api/productApi';

export const fetchSingleProduct = createAsyncThunk('singleProduct/fetchSingleProduct', async (id, { rejectWithValue }) => {
  const { data, error } = await fetchProductByIdApi(id);
  if (error) return rejectWithValue(error);
  return data;
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