import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "process";
import { CommonResponse } from "../../types/common";
import { postRefreshToken } from "../auth/AuthAPI";

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

      switch (customErrorCode) {
        case 4053: // AUTH_EXPIRED_TOKEN(BAD_REQUEST, 4053, "토큰의 유효기간이 만료되었습니다.")
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
          break;
        case 4050: // AUTH_NULL_TOKEN(BAD_REQUEST,4050,"헤더에 토큰이 없습니다")
        case 4051: // AUTH_INVALID_TOKEN(BAD_REQUEST, 4051, "검증 결과 잘못된 토큰입니다."),
        case 4052: // AUTH_OUTDATED_REFRESH_TOKEN(BAD_REQUEST,4052,"갱신되기 이전의 리프레시 토큰입니다.")
        case 4054: // AUTH_TYPE_MISMATCH_TOKEN(BAD_REQUEST,4054,"토큰의 타입이 맞지 않습니다.")
        case 4055: // AUTH_UNAUTHORIZED_ACCESS(FORBIDDEN,4055,"인증되었으나 해당 요청에 대한 권한이 부족합니다.")
        case 4056: // AUTH_FAIL_LOGIN(FORBIDDEN,4056,"아이디 또는 비밀번호를 잘못 입력하였습니다.")
        case 4057: // AUTH_FAIL_PASSWORD_MATCHING(BAD_REQUEST,4057,"비밀번호가 올바르지 않습니다.")
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          window.location.href = "/";
          break;
        default:
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
