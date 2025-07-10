import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const getUserId = () => localStorage.getItem('userId');

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  const userId = getUserId();
  if (!userId) return [];
  try {
    const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    return res.data.items || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (product, { rejectWithValue, dispatch }) => {
  const userId = getUserId();
  if (!userId) {
    toast.error('Please Login First');
    return rejectWithValue('No user');
  }
  try {
    const res = await axios.post('http://localhost:5000/api/cart', {
      userId,
      productId: product._id || product.id,
      count: 1,
    });
    dispatch(fetchCart());
    return res.data.items || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { rejectWithValue, dispatch }) => {
  const userId = getUserId();
  if (!userId) return rejectWithValue('No user');
  try {
    const res = await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
    dispatch(fetchCart());
    return res.data.items || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
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
      .addCase(removeFromCart.rejected, (state, action) => { state.error = action.payload; });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer; 