import axios from "axios";
import { toast } from "react-toastify";


let authorizedAxiosInstance = axios.create();


// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data?.message) {
      toast.success(response.data?.message);
    }
    return response;
  },
  async function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      toast.error(error.response?.data?.message || "Something went wrong!", );

    }
    return Promise.reject(error);
  }
);
export default authorizedAxiosInstance;
