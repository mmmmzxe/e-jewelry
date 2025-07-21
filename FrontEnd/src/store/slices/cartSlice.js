import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchCartApi,
  addToCartApi,
  removeFromCartApi,
  clearCartApi
} from '../../server/api/cartApi';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchCartApi();
  if (error) return rejectWithValue(error);
  return data.items || [];
});

export const addToCart = createAsyncThunk('cart/addToCart', async (product, { rejectWithValue, dispatch }) => {
  if (!product?._id && !product?.id) {
    toast.error('Invalid product');
    return rejectWithValue('Invalid product');
  }
  try {
    const { data, error } = await addToCartApi(product._id || product.id, 1);
    if (error) throw new Error(error);
    dispatch(fetchCart());
    return data.items || [];
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { rejectWithValue, dispatch }) => {
  try {
    const { data, error } = await removeFromCartApi(productId);
    if (error) throw new Error(error);
    dispatch(fetchCart());
    return data.items || [];
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const clearCartThunk = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data, error } = await clearCartApi();
    if (error) throw new Error(error);
    dispatch(fetchCart());
    return [];
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [], loading: false, error: null },
  reducers: {
    clearCart: (state) => { state.cartItems = []; }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.cartItems = action.payload; })
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addToCart.rejected, (state, action) => { state.error = action.payload; })
      .addCase(removeFromCart.rejected, (state, action) => { state.error = action.payload; })
      .addCase(clearCartThunk.fulfilled, (state) => { state.cartItems = []; })
      .addCase(clearCartThunk.rejected, (state, action) => { state.error = action.payload; });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer; 