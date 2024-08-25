import { useNavigate } from "react-router";
import { Post } from "../util/apiUtils";
import { RequestLoginParams, ResponseLogin } from "./../../types/auth.d";
const authService = {
  // const navigate = useNavigate();
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
        await sessionStorage.setItem("accessToken", accessToken);
        // await localStorage.setItem("refreshToken", refreshToken);
        document.cookie = `refreshToken=${refreshToken}; Secure;`;
        // // 로그인 이후 워크스페이스로 이동 => hook은 이 안에 쓸 수 없음, 다른방식 이용해야함
        // navigate("/workspace");
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
