import axios from "axios";
import { getToken } from "../Auth";


export const BASE_URL="http://localhost:9292";


export const axiosApi = axios.create({
    baseURL:BASE_URL
});

export const privateAxios = axios.create({
    baseURL: BASE_URL,
  });
  
 
  privateAxios.interceptors.request.use(
    (config) => {
      const token = getToken();
      console.log(token);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log(config);
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );