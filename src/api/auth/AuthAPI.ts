import { Post } from "../util/apiUtils";
import { RequestLoginParams, ResponseLogin } from "../../types/auth";
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

        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);

        return response.data.isSuccess;
      } else {
        console.error("Login failed: ", response.data.message);
      }
    } catch (err) {
      console.error("Login failed: ", err);
    }
  },

  /**
   * Request authentication using the refresh token when the access token expires
   * @returns {accessToekn, refreshToken}
   */
  postRefreshToken: async () => {
    const response = await Post<ResponseLogin>(
      "/auth/reissue",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
        },
      }
    );

    const { accessToken, refreshToken } = response.data.result;
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);

    return accessToken;
  },

  /**
   * Request logout
   */
  postLogout: async () => {
    try {
      const response = await Post("/auth/logout");

      if (response.data.isSuccess) {
        sessionStorage.clear();
        // document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure;";

        return response.data.isSuccess;
      } else {
        console.error("Logout failed: ", response.data.message);
      }
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  },

  /**
   * Request change password
   */
  updatePassword: async (oldPassword: string, newPassword: string) => {
    try {
      const response = await Post(`auth/password`, {
        oldPassword,
        newPassword,
      });

      if (response.data.isSuccess) {
        return response.data.isSuccess;
      } else {
        console.error("Update password failed : ", response.data.message);
      }
    } catch (err) {
      console.error("Update password failed : ", err);
    }
  },
};

export const { loginApi, postRefreshToken, postLogout, updatePassword } =
  authService;
