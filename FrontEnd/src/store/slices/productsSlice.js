import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('http://localhost:5000/api/products');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchWeeklyBestsellers = createAsyncThunk('products/fetchWeeklyBestsellers', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('http://localhost:5000/api/products/weekly-bestsellers');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (category, { rejectWithValue }) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/categories/${category}/products`);
    return res.data.products || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Add thunk to update product rating
export const updateProductRating = createAsyncThunk('products/updateProductRating', async ({ productId }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    return { productId, rating: res.data.rating };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    weeklyBestsellers: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchWeeklyBestsellers.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchWeeklyBestsellers.fulfilled, (state, action) => { state.loading = false; state.weeklyBestsellers = action.payload; })
      .addCase(fetchWeeklyBestsellers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchProductsByCategory.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProductsByCategory.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateProductRating.fulfilled, (state, action) => {
        const { productId, rating } = action.payload;
        const product = state.products.find(p => p._id === productId || p.id === productId);
        if (product) {
          product.rating = rating;
        }
        // Optionally update single product if present
        if (state.product && (state.product._id === productId || state.product.id === productId)) {
          state.product.rating = rating;
        }
      });
  }
});

export default productsSlice.reducer; 