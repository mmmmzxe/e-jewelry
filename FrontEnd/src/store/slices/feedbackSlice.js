import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async (productId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/api/feedback/${productId}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const submitFeedback = createAsyncThunk('feedback/submitFeedback', async (feedbackData, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/feedback', feedbackData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
    submitting: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeedback.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchFeedback.fulfilled, (state, action) => { state.loading = false; state.feedbacks = action.payload; })
      .addCase(fetchFeedback.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(submitFeedback.pending, state => { state.submitting = true; state.error = null; })
      .addCase(submitFeedback.fulfilled, (state, action) => { state.submitting = false; state.feedbacks.push(action.payload); })
      .addCase(submitFeedback.rejected, (state, action) => { state.submitting = false; state.error = action.payload; });
  }
});

export default feedbackSlice.reducer; 