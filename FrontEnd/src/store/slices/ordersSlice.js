import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchOrdersApi,
  fetchMyOrdersApi,
  updateOrderStatusApi
} from '../../server/api/orderApi';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchOrdersApi();
  if (error) return rejectWithValue(error);
  return data;
});

export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchMyOrdersApi();
  if (error) return rejectWithValue(error);
  return data;
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, status }, { rejectWithValue }) => {
  const { data, error } = await updateOrderStatusApi(orderId, status);
  if (error) return rejectWithValue(error);
  return { orderId, status: data.status };
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { data: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchMyOrders.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchMyOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateOrderStatus.pending, state => { state.loading = true; state.error = null; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map(o => o._id === action.payload.orderId ? { ...o, status: action.payload.status } : o);
      })
      .addCase(updateOrderStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default ordersSlice.reducer;
