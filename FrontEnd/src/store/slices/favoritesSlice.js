import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchFavoritesApi,
  addToFavoritesApi,
  removeFromFavoritesApi
} from '../../server/api/favoritesApi';

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await fetchFavoritesApi();
    if (error) throw new Error(error);
    return data.products || [];
  } catch (err) {
    
    return rejectWithValue(err.message);
  }
});

export const addToFavorites = createAsyncThunk('favorites/addToFavorites', async (product, { rejectWithValue, dispatch }) => {
  if (!product?._id && !product?.id) {
    
    return rejectWithValue('Invalid product');
  }
  try {
    const { data, error } = await addToFavoritesApi(product._id || product.id);
    if (error) throw new Error(error);
    dispatch(fetchFavorites());
    return data.products || [];
  } catch (err) {
 
    return rejectWithValue(err.message);
  }
});

export const removeFromFavorites = createAsyncThunk('favorites/removeFromFavorites', async (productId, { rejectWithValue, dispatch }) => {
  try {
    const { data, error } = await removeFromFavoritesApi(productId);
    if (error) throw new Error(error);
    dispatch(fetchFavorites());
    return data.products || [];
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { favorites: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchFavorites.fulfilled, (state, action) => { state.loading = false; state.favorites = action.payload; })
      .addCase(fetchFavorites.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addToFavorites.rejected, (state, action) => { state.error = action.payload; })
      .addCase(removeFromFavorites.rejected, (state, action) => { state.error = action.payload; });
  }
});

export default favoritesSlice.reducer; 