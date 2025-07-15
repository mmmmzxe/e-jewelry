import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi
} from '../../server/api/categoryApi';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchCategoriesApi();
  if (error) return rejectWithValue(error);
  return data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (form, { rejectWithValue }) => {
  const { data, error } = await addCategoryApi(form);
  if (error) return rejectWithValue(error);
  return data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, form }, { rejectWithValue }) => {
  const { data, error } = await updateCategoryApi(id, form);
  if (error) return rejectWithValue(error);
  return data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, { rejectWithValue }) => {
  const { data, error } = await deleteCategoryApi(id);
  if (error) return rejectWithValue(error);
  return id;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addCategory.pending, state => { state.loading = true; state.error = null; })
      .addCase(addCategory.fulfilled, (state, action) => { state.loading = false; state.categories.push(action.payload); })
      .addCase(addCategory.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateCategory.pending, state => { state.loading = true; state.error = null; })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map(cat => cat._id === action.payload._id ? action.payload : cat);
      })
      .addCase(updateCategory.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteCategory.pending, state => { state.loading = true; state.error = null; })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export default categoriesSlice.reducer; 