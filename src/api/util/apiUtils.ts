import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { CommonResponse } from "../../types/common";

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
  // withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Utility for axios GET method
 */
export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await api.get(url, config);

  return response;
};

/**
 * Utility for axios POST method
 */
export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await api.post(url, data, config);

  return response;
};
