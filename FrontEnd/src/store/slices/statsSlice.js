import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStatsApi } from '../../server/api/statsApi';

export const fetchStats = createAsyncThunk('stats/fetchStats', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchStatsApi();
  if (error) return rejectWithValue(error);
  return data;
});

const statsSlice = createSlice({
  name: 'stats',
  initialState: { stats: null, loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchStats.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchStats.fulfilled, (state, action) => { state.loading = false; state.stats = action.payload; })
      .addCase(fetchStats.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default statsSlice.reducer; 