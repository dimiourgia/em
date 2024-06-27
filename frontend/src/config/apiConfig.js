

import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
      }
      return config;
    } catch (error) {
      throw new Error("Failed to attach JWT to request: " + error.message);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
