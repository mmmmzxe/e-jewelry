import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFeedbackApi, submitFeedbackApi, fetchAllFeedbackApi } from '../../server/api/feedbackApi';

export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async (productId, { rejectWithValue }) => {
  const { data, error } = await fetchFeedbackApi(productId);
  if (error) return rejectWithValue(error);
  return data;
});

export const submitFeedback = createAsyncThunk('feedback/submitFeedback', async (feedbackData, { rejectWithValue }) => {
  const { data, error } = await submitFeedbackApi(feedbackData);
  if (error) return rejectWithValue(error);
  return data;
});

export const fetchAllFeedback = createAsyncThunk('feedback/fetchAllFeedback', async (_, { rejectWithValue }) => {
  const { data, error } = await fetchAllFeedbackApi();
  if (error) return rejectWithValue(error);
  return data;
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
    submitting: false,
    allFeedbacks: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeedback.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchFeedback.fulfilled, (state, action) => { state.loading = false; state.feedbacks = action.payload; })
      .addCase(fetchFeedback.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(submitFeedback.pending, state => { state.submitting = true; state.error = null; })
      .addCase(submitFeedback.fulfilled, (state, action) => { state.submitting = false; state.feedbacks.push(action.payload); })
      .addCase(submitFeedback.rejected, (state, action) => { state.submitting = false; state.error = action.payload; })
      .addCase(fetchAllFeedback.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchAllFeedback.fulfilled, (state, action) => { state.loading = false; state.allFeedbacks = action.payload; })
      .addCase(fetchAllFeedback.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export default feedbackSlice.reducer; 