import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMonthlySalesApi } from '../../server/api/salesApi';

export const fetchMonthlySales = createAsyncThunk('sales/fetchMonthlySales', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchMonthlySalesApi();
  if (error) return rejectWithValue(error);
  return data;
});

const salesSlice = createSlice({
  name: 'sales',
  initialState: { sales: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchMonthlySales.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchMonthlySales.fulfilled, (state, action) => { state.loading = false; state.sales = action.payload; })
      .addCase(fetchMonthlySales.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default salesSlice.reducer; 