import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo_google from "../assets/logo/logo_google.png";
import logo_github from "../assets/logo/logo_github.png";
import { RootState, AppDispatch } from "../store/store";
import { login } from "../features/authSlice";
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // AppDispatch 타입 지정
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await apiClient.post(`/api/auth/login`, {
        username,
        password,
      });

      if (response.data.isSuccess) {
        const { access_token, refresh_token } = response.data.result;
        // 토큰 저장
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        // 워크스페이스로 이동
        navigate("/workspace");
      } else {
        console.error("Login failed: ", response.data.message);
      }
    } catch (err) {
      console.error("Login failed: ", err);
    }
  };

  // const handleSocialLogin = (provider: string) => {
  //   window.location.href = `${API_URL}/auth/${provider}`;
  // };

  return (
    <div className="flex h-screen items-center justify-center p-20">
      <div className="flex w-4/5 flex-col items-center justify-center">
        <div>
          <span className="hidden text-4xl font-bold text-white md:inline">
            WELCOME TO&nbsp;
          </span>
          <span className="text-5xl font-bold text-orange">CHATTY</span>
        </div>
        <div className="w-full min-w-80 max-w-96 pt-10">
          <div>
            <p className="text-l font-bold text-white">ID</p>
            <div className="mt-2 flex items-center">
              <input
                type="text"
                className="h-12 w-full rounded-md border-2 border-white bg-body px-5 text-white focus:outline-none"
                placeholder="아이디를 입력해주세요."
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
            </div>
          </div>
          <div className="items-center pt-5">
            <p className="text-l font-bold text-white">PASSWORD</p>
            <div className="mt-2 flex items-center">
              <input
                type="password"
                className="h-12 w-full rounded-md border-2 border-white bg-body px-5 text-white focus:outline-none"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <a href="#" className="text-xs text-purple">
              비밀번호를 잊어버렸나요?
            </a>
          </div>
          <div className="mt-7 flex items-center justify-center">
            <button
              type="button"
              className="h-12 w-full rounded-lg bg-black p-2 text-white hover:bg-opacity-50 drop-shadow-lg"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-2 flex items-center justify-center">
            <p className="text-xs text-gray">webChatty를 처음 사용하시나요?</p>
            <Link to="/signup">
              <p className="pl-3 text-xs text-purple">회원가입</p>
            </Link>
          </div>
        </div>
        <div className="flex w-full min-w-80 flex-col items-center justify-center">
          <div className="flex justify-center items-center w-full min-w-80 max-w-96">
            <hr className="my-8 h-px w-full max-w-96 border-white" />
            <div className="text-center text-white text-xs w-[100px]">또는</div>
            <hr className="my-8 h-px w-full max-w-96 border-white" />
          </div>
          <div className="flex gap-20">
            <button>
              <img src={logo_google} className="h-10 w-10" />
            </button>
            <button>
              <img src={logo_github} className="h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
