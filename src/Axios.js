import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.226:8000/api/", // Update with your API base URL
// baseURL: "https://kitecareer.com/watsmyapi/api/",
headers: {
  'Content-Type': 'application/json',
},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      Swal.fire("Error", "Session expired. Please log in again.", "error");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
