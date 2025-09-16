import axios from "axios";
import Url from "@/api/Url";
import { logout } from "@/services/auth.service";

const http = axios.create({
  baseURL: Url,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // توکن منقضی شده
      logout();
      window.location.href = "/login";
    }
    console.error(error);
    return Promise.reject(error);
  }
);

export default http;
