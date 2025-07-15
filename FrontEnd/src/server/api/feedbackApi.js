import { apiGet, apiPost } from './api';

export function fetchFeedbackApi(productId) {
  return apiGet(`/api/feedback/${productId}`);
}

export function submitFeedbackApi(feedbackData) {
  return apiPost('/api/feedback', feedbackData);
}

export function fetchAllFeedbackApi() {
  return apiGet('/api/feedback');
} 