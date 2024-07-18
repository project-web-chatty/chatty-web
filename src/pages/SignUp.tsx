import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setIsUsernameUnique(false);
    setUsernameError("");
  };

  const handleCheckUsername = async () => {
    setIsCheckingUsername(true);
    try {
      const response = await axios.get(
        `/member/check/username?username=${username}`
      );
      if (response.data.isUnique) {
        setIsUsernameUnique(true);
        setUsernameError("");
      } else {
        setIsUsernameUnique(false);
        setUsernameError("아이디가 이미 존재합니다.");
      }
    } catch (error) {
      setUsernameError("아이디 확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValid = validatePassword(newPassword);
    setIsPasswordValid(isValid);
    setIsPasswordMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsPasswordMatch(newConfirmPassword === password);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
    return passwordRegex.test(password);
  };

  // const isFormValid = isUsernameUnique && isPasswordValid && isPasswordMatch;
  const isFormValid = isPasswordValid && isPasswordMatch;

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
            <div className="mt-2 flex h-12 w-full items-center justify-between rounded-md border-2 border-white px-5">
              <input
                type="text"
                className="bg-body text-white focus:outline-none"
                placeholder="아이디를 입력해주세요."
                value={username}
                onChange={handleUsernameChange}
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
              <p className="text-xs text-white">{usernameError}</p>
            )}
            {isUsernameUnique && (
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
              <div>
                <p
                  className={`text-xs ${isPasswordValid ? "text-green" : "text-orange"}`}
                >
                  영문(소문자와 대문자), 숫자, 특수문자 포함 8자 ~ 20자
                </p>
              </div>
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
