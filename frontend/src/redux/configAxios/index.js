import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from "../../utils/baseUrl";

const customeAxios = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
  withCredentials: true, // Send cookies with each request
});
customeAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        await axios.post("/auth/refresh", {}, { withCredentials: true }); // Refresh endpoint using refresh token

        return customeAxios(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Refresh failed, prompt login
        Swal.fire({
          title: "Autho fail!",
          text: "Please login again.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
        }).then(async (result) => {
          if (result.isConfirmed) {
            window.location.href = "/login"; // Redirect to login or handle as necessary
          }
        });

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default customeAxios;
