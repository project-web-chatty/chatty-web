import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [isUsernameSuccess, setIsUsernameSuccess] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setIsUsernameSuccess(false);
    setUsernameError("");
  };

  const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
  });

  // 아이디 유효성 검사
  const handleCheckUsername = async () => {
    // username 길이가 6자 이상인지 확인
    if (username.length < 6) {
      setUsernameError("6자 이상 입력해 주세요.");
      return;
    }
    console.log(username);

    setIsCheckingUsername(true);
    try {
      const response = await apiClient.post(
        `/member/check?username=${username}`
      );
      if (response.data.isSuccess) {
        setIsUsernameSuccess(true);
        setUsernameError("");
      } else {
        setIsUsernameSuccess(false);
        setUsernameError("아이디가 이미 존재합니다.");
      }
    } catch (error) {
      setUsernameError("아이디가 이미 존재합니다.");
    } finally {
      setIsCheckingUsername(false);
    }
  };

  // 비밀변경 설정
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    setIsPasswordMatch(newPassword === confirmPassword);
  };

  // 비밀번호 확인
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsPasswordMatch(newConfirmPassword === password);
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    const criteria = {
      length: password.length >= 8 && password.length <= 20,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    };
    setPasswordCriteria(criteria);
  };

  // 회원가입 완료
  const handleSignUp = async () => {
    try {
      const response = await apiClient.post("/api/member/signup", {
        username,
        password,
      });
      if (response.data.isSuccess) {
        alert("회원가입에 성공했습니다.");
        navigate("/"); // 회원가입 성공 후 로그인 페이지로 이동
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  // 모든 조건 만족시
  const isFormValid =
    isUsernameSuccess &&
    Object.values(passwordCriteria).every(Boolean) &&
    isPasswordMatch;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-4/5 flex-col items-center justify-center gap-6">
        <div>
          <span className="hidden text-4xl font-bold text-white md:inline">
            WELCOME TO&nbsp;
          </span>
          <span className="text-5xl font-bold text-orange">CHATTY</span>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-white">SIGN UP</p>
        </div>
        <div className="w-full min-w-80 max-w-96">
          <div>
            <p className="text-l font-bold text-white">ID</p>
            <div className="mt-2 flex h-12 w-full items-center justify-between rounded-md border-2 border-white px-5 mb-2">
              <input
                type="text"
                className="bg-body text-white focus:outline-none"
                placeholder="아이디를 입력해주세요."
                value={username}
                onChange={handleUsernameChange}
                minLength={6}
              />
              <button
                type="button"
                className="min-w-20 rounded-md bg-purple p-2 text-xs text-white"
                onClick={handleCheckUsername}
                disabled={isCheckingUsername || !username}
              >
                {isCheckingUsername ? "확인 중..." : "중복확인"}
              </button>
            </div>
            {usernameError && (
              <p className="text-xs text-orange">{usernameError}</p>
            )}
            {isUsernameSuccess && (
              <p className="text-xs text-white">아이디를 사용할 수 있습니다.</p>
            )}
          </div>
          <div className="items-center pt-5">
            <p className="text-l font-bold text-white">PASSWORD</p>
            <div className="mt-2 flex flex-col gap-2">
              <input
                type="password"
                className="h-12 w-full rounded-md border-2 border-white bg-body px-5 text-white focus:outline-none"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={handlePasswordChange}
              />
              {password && (
                <div className="flex flex-col">
                  <div className="flex gap-5">
                    <p
                      className={`text-xs ${
                        passwordCriteria.lowercase
                          ? "text-green"
                          : "text-orange"
                      }`}
                    >
                      소문자 포함{passwordCriteria.lowercase ? "✅" : "❌"}
                    </p>
                    <p
                      className={`text-xs ${
                        passwordCriteria.uppercase
                          ? "text-green"
                          : "text-orange"
                      }`}
                    >
                      대문자 포함{passwordCriteria.uppercase ? "✅" : "❌"}
                    </p>
                    <p
                      className={`text-xs ${
                        passwordCriteria.number ? "text-green" : "text-orange"
                      }`}
                    >
                      숫자 포함{passwordCriteria.number ? "✅" : "❌"}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <p
                      className={`text-xs ${
                        passwordCriteria.length ? "text-green" : "text-orange"
                      }`}
                    >
                      8자 이상 20자 이하{passwordCriteria.length ? "✅" : "❌"}
                    </p>

                    <p
                      className={`text-xs ${
                        passwordCriteria.specialChar
                          ? "text-green"
                          : "text-orange"
                      }`}
                    >
                      특수문자 포함
                      {passwordCriteria.specialChar ? "✅" : "❌"}
                    </p>
                  </div>
                </div>
              )}

              <input
                type="password"
                className="h-12 w-full rounded-md border-2 border-white bg-body px-5 text-white focus:outline-none"
                placeholder="비밀번호를 다시 한번 입력해주세요."
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              {password && !isPasswordMatch && confirmPassword ? (
                <p className="text-xs text-orange">
                  비밀번호가 일치하지 않습니다.
                </p>
              ) : (
                confirmPassword && (
                  <p className="text-xs text-green">비밀번호가 일치합니다.</p>
                )
              )}
            </div>
          </div>
          <div className="mt-7 flex items-center justify-center ">
            <button
              type="button"
              className={`h-12 w-full rounded-lg bg-black p-2 text-white drop-shadow-lg ${
                !isFormValid && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleSignUp}
              disabled={!isFormValid}
            >
              회원가입
            </button>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <p className="text-xs text-gray">webChatty 계정이 있으신가요?</p>
            <Link to="/">
              <p className="pl-3 text-xs text-purple">로그인</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
