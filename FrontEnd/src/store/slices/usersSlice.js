import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersApi } from '../../server/api/userApi';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchUsersApi();
  if (error) return rejectWithValue(error);
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default usersSlice.reducer; 