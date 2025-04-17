import axios from "axios";

import { API_URL, PREFIX_BASE_URL } from "./constants";

import { getCookie } from "@/lib/cookies";

const api = axios.create({
  baseURL: `${API_URL}/${PREFIX_BASE_URL}`,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
