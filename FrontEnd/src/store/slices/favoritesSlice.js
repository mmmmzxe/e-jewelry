import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const getUserId = () => localStorage.getItem('userId');

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (_, { rejectWithValue }) => {
  const userId = getUserId();
  if (!userId) {
    toast.error('Please Login First');
    return [];
  }
  try {
    const res = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
    return res.data.products || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addToFavorites = createAsyncThunk('favorites/addToFavorites', async (product, { rejectWithValue, dispatch }) => {
  const userId = getUserId();
  if (!userId) {
    toast.error('Please Login First');
    return rejectWithValue('No user');
  }
  try {
    const res = await axios.post('http://localhost:5000/api/favorites', {
      userId,
      productId: product._id || product.id,
    });
    dispatch(fetchFavorites());
    return res.data.products || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeFromFavorites = createAsyncThunk('favorites/removeFromFavorites', async (productId, { rejectWithValue, dispatch }) => {
  const userId = getUserId();
  if (!userId) return rejectWithValue('No user');
  try {
    const res = await axios.delete(`http://localhost:5000/api/favorites/${userId}/${productId}`);
 
    dispatch(fetchFavorites());
    return res.data.products || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
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