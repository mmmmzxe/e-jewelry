import { apiGet, apiPost } from './api';

export function fetchFeedbackApi(productId) {
  return apiGet(`https://jewelry.up.railway.app/api/feedback/${productId}`);
}


export function submitFeedbackApi(feedbackData) {
  return apiPost('https://jewelry.up.railway.app/api/feedback', feedbackData);
}

export function fetchAllFeedbackApi() {
  return apiGet('https://jewelry.up.railway.app/api/feedback');
} 