import { Post } from "../util/apiUtils";
import { RequestLoginParams, ResponseLogin } from "./../../types/auth.d";

const authService = {
  /**
   * This function sends a login request to the server.
   * If successful, it stores the token in local storage.
   * If the login fails, it displays an error message.
   */
  loginApi: async (data: RequestLoginParams) => {
    try {
      const response = await Post<ResponseLogin>("/auth/login", data);

      if (response.data.isSuccess) {
        const { accessToken, refreshToken } = response.data.result;
        // 토큰 저장
        await localStorage.setItem("accessToken", accessToken);
        await localStorage.setItem("refreshToken", refreshToken);

        return response.data.isSuccess;
      } else {
        console.error("Login failed: ", response.data.message);
      }
    } catch (err) {
      console.error("Login failed: ", err);
    }
  },
};

export const { loginApi } = authService;
