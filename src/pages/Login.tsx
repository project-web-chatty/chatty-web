import React from "react";
import { Link } from "react-router-dom";
import githubLogo from "../styles/images/github-mark.png";
import googleLogo from "../styles/images/Google_Logo.png";

function Login() {
  return (
    <div className="h-full p-20">
      <div className="flex m-auto w-96 items-center justify-center">
        <p className="text-3xl font-bold text-white">WELCOME TO&nbsp;</p>
        <p className="text-3xl font-bold text-orange">CHATTY</p>
      </div>
      <div className="m-auto items-center pt-10 w-96">
        <p className="text-l font-bold text-white">ID</p>
        <div className="flex items-center mt-2">
          <input
            type="text"
            className="border-2 border-white w-full bg-body py-2 px-5 rounded-md text-white focus:outline-none"
            placeholder="아이디를 입력해주세요."
          />
        </div>
      </div>
      <div className="m-auto items-center pt-10 w-96">
        <p className="text-l font-bold text-white">PASSWORD</p>
        <div className="flex items-center mt-2">
          <input
            type="text"
            className="border-2 border-white w-full bg-body py-2 px-5 rounded-md text-white focus:outline-none"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <div className="flex items-center mt-2">
          <p className="text-xs text-purple">비밀번호를 잊어버렸나요?</p>
        </div>
        <div className="w-full px-5 justify-center items-center">
          <div className="flex items-center justify-center py-5">
            <div className="border border-white w-full"></div>
            <p className="text-xs text-white w-12">또는</p>
            <div className="border border-white w-full"></div>
          </div>
          <div className="flex items-center justify-around">
            <div className="bg-white items-center justify-center p-1 rounded-full">
              <img className="w-10 h-10" src={googleLogo} alt="" />
            </div>
            <div className="bg-white items-center justify-center p-1 rounded-full ml-10">
              <img className="w-10 h-10" src={githubLogo} alt="" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            type="button"
            className="bg-black w-full p-2 rounded-lg text-white"
          >
            로그인
          </button>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-gray">webChatty를 처음 사용하시나요?</p>
          <Link to="/signup">
            <p className="text-xs text-purple pl-3">회원가입</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
