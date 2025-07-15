import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductsApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  fetchWeeklyBestsellersApi,
  fetchProductsByCategoryApi,
  fetchProductByIdApi
} from '../../server/api/productApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchProductsApi();
  if (error) return rejectWithValue(error);
  return data;
});

export const addProduct = createAsyncThunk('products/addProduct', async ({ form, mainImage, images }, { rejectWithValue }) => {
  const { data, error } = await addProductApi(form, mainImage, images);
  if (error) return rejectWithValue(error);
  return data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, form, mainImage, images }, { rejectWithValue }) => {
  const { data, error } = await updateProductApi(id, form, mainImage, images);
  if (error) return rejectWithValue(error);
  return data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { rejectWithValue }) => {
  const { data, error } = await deleteProductApi(id);
  if (error) return rejectWithValue(error);
  return id;
});

export const fetchWeeklyBestsellers = createAsyncThunk('products/fetchWeeklyBestsellers', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchWeeklyBestsellersApi();
  if (error) return rejectWithValue(error);
  return data;
});

export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (category, { rejectWithValue }) => {
  const { data, error } = await fetchProductsByCategoryApi(category);
  if (error) return rejectWithValue(error);
  return data.products || [];
});

export const updateProductRating = createAsyncThunk('products/updateProductRating', async ({ productId }, { rejectWithValue }) => {
  const { data, error } = await fetchProductByIdApi(productId);
  if (error) return rejectWithValue(error);
  return { productId, rating: data.rating };
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
      .addCase(addProduct.pending, state => { state.loading = true; state.error = null; })
      .addCase(addProduct.fulfilled, (state, action) => { state.loading = false; state.products.push(action.payload); })
      .addCase(addProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateProduct.pending, state => { state.loading = true; state.error = null; })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map(p => p._id === action.payload._id ? action.payload : p);
      })
      .addCase(updateProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteProduct.pending, state => { state.loading = true; state.error = null; })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
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