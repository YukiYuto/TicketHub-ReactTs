import axios from "axios";

import { HOST_API_KEY } from "@utils/apiUrl/gobalConfig";
import { getJwtTokenSession } from "@/auth/auth.utilities";

// Creating an instance of Axios with a base URL
const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
});

// Adding a request interceptor to include Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getJwtTokenSession();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Adding a response interceptor to the Axios instance
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response) || "General Axios Error happened"
    )
);

export default axiosInstance;
