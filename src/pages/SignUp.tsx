import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="h-full p-20">
      <div className="flex m-auto w-96 items-center justify-center">
        <p className="text-3xl font-bold text-white">WELCOME TO&nbsp;</p>
        <p className="text-3xl font-bold text-orange">CHATTY</p>
      </div>
      <div className="flex m-auto w-96 items-center justify-center pt-10">
        <p className="text-xl font-bold text-white">SIGN UP</p>
      </div>
      <div className="m-auto items-center pt-10 w-96">
        <p className="text-l font-bold text-white">ID</p>
        <div className="flex items-center mt-2 border-2 border-white w-full rounded-md p-2">
          <input
            type="text"
            className="bg-body px-3 text-white w-full focus:outline-none"
            placeholder="아이디를 입력해주세요."
          />
          <button
            type="button"
            className="bg-purple p-2 rounded-md text-white text-xs"
            style={{ width: 80, marginLeft: 10 }}
          >
            중복확인
          </button>
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
          <input
            type="text"
            className="border-2 border-white w-full bg-body py-2 px-5 rounded-md text-white focus:outline-none"
            placeholder="비밀번호를 다시 한번 입력해주세요."
          />
        </div>
        <div className="flex items-center mt-2">
          <p className="text-xs text-orange">
            대소문자 6~10 이내, 숫자, 특수기호
          </p>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            type="button"
            className="bg-black w-full p-2 rounded-lg text-white"
          >
            회원가입
          </button>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-gray">webChatty 계정이 있으신가요?</p>
          <Link to="/">
            <p className="text-xs text-purple pl-3">로그인</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
