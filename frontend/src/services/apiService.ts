import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../features/auth/utils";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "/api",
});
export default class ApiService {
  constructor() {
    const token = getToken();
    if (token) {
      ApiService.fetcher.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  static updateToken = () => {
    const token = getToken();
    if (token) {
      ApiService.fetcher.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  };

  static fetcher = axiosInstance;

  get<T>(url: string, config?: AxiosRequestConfig) {
    return ApiService.fetcher.get<T>(url, config);
  }
  post<T>(url: string, config?: AxiosRequestConfig) {
    return ApiService.fetcher.post<T>(url, config);
  }

  put<T>(url: string, config?: AxiosRequestConfig) {
    return ApiService.fetcher.put<T>(url, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return ApiService.fetcher.delete<T>(url, config);
  }

  // setHeader(headers: { [x: string]: any }) {
  //   Object.keys(headers).forEach((key) => {
  //     ApiService.fetcher.defaults.headers[key] = headers[key];
  //   });
  // }
}
