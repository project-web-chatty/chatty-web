import React from "react";
import { Link } from "react-router-dom";
import logo_google from "../assets/logo/logo_google.png";
import logo_github from "../assets/logo/logo_github.png";

function Login() {
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
              />
            </div>
          </div>
          <div className="items-center pt-5">
            <p className="text-l font-bold text-white">PASSWORD</p>
            <div className="mt-2 flex items-center">
              <input
                type="text"
                className="h-12 w-full rounded-md border-2 border-white bg-body px-5 text-white focus:outline-none"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <a href="#" className="text-xs text-purple">
              비밀번호를 잊어버렸나요?
            </a>
          </div>
          <Link to={"/workspace"}>
            <div className="mt-7 flex items-center justify-center ">
              <button
                type="button"
                className="h-12 w-full rounded-lg bg-black p-2 text-white hover:bg-opacity-50 drop-shadow-lg"
              >
                로그인
              </button>
            </div>
          </Link>
          <div className="mt-2 flex items-center justify-center">
            <p className="text-xs text-gray">webChatty를 처음 사용하시나요?</p>
            <Link to="/signup">
              <p className="pl-3 text-xs text-purple">회원가입</p>
            </Link>
          </div>
        </div>
        <div className="flex w-full min-w-80 flex-col items-center justify-center">
          <div className="flex justify-center items-center w-full min-w-80 max-w-96 ">
            <hr className="my-8 h-px w-full max-w-96 bg-white" />
            <div className="text-center text-white text-xs w-[100px]">또는</div>
            <hr className="my-8 h-px w-full max-w-96 bg-white" />
          </div>
          <div className="flex gap-20">
            <a href="#">
              <img src={logo_google} className="h-10 w-10" />
            </a>
            <a href="#">
              <img src={logo_github} className="h-10 w-10" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
