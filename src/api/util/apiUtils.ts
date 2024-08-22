import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { CommonResponse } from "../../types/common";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
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
  const response = await axiosInstance.get(url, config);

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
  const response = await axiosInstance.post(url, data, config);

  return response;
};

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await axiosInstance.put(url, data, config);

  return response;
};

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await axiosInstance.patch(url, data, config);

  return response;
};

export const Delete = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await axiosInstance.delete(url, config);

  return response;
};
