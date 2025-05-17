import axios from "axios";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Backend API URL
const API_BASE_URL = `${backendUrl}/api`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add token to requests if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
