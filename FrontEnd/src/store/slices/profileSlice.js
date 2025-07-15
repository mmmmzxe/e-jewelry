import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfileApi } from '../../server/api/profileApi';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchProfileApi();
  if (error) return rejectWithValue(error);
  return data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: null, loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default profileSlice.reducer;
