import axios from "axios";

const api = axios.create({
  baseURL: "https://asi-admin-4.onrender.com/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!(config.data instanceof FormData)) {
  config.headers["Content-Type"] = "application/json";
}

  return config;
});

export default api;