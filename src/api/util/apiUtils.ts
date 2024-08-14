import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CommonResponse } from "../../types/common";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  // withCredentials: true,
});

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
