import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "process";
import { CommonResponse } from "../../types/common";
import { postRefreshToken } from "../auth";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/auth/reissue")) {
      return config; // refresh token 요청 시 인터셉터 무시 (없으면 무한루프 발생)
    }

    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// 대기 중인 요청들을 처리하는 함수
const onRrefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 대기 중인 요청을 추가하는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    console.log(originalRequest);

    if (response.status === 400) {
      const customErrorCode = response.data.code;

      // 4053 : 토큰 만료 에러 처리
      if (response.data.code === 4053) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newAccessToken = await postRefreshToken();
            isRefreshing = false;
            onRrefreshed(newAccessToken);
          } catch (refreshError) {
            isRefreshing = false;

            return Promise.reject(refreshError);
          }
        }

        return new Promise((resolve) => {
          addRefreshSubscriber((newAccessToken: string) => {
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      } else {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/";
      }
    }
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
