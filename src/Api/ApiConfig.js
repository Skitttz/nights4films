import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Helper function to get auth headers
export const getAuthHeaders = (token) => {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// Function to handle ApiError
export const handleApiError = (error) => {
  throw error.response.data.error.message;
};

// Generalized request function
export const makeRequest = async (method, url, token = null, data = null) => {
  const headers = token ? getAuthHeaders(token) : {};
  try {
    const response = await api({ method, url, data, ...headers });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
