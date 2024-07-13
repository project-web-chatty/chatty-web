import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
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
              />
              <button
                type="button"
                className="min-w-20 rounded-md bg-purple p-2 text-xs text-white"
                style={{ width: 80, marginLeft: 10 }}
              >
                중복확인
              </button>
            </div>
          </div>
          <div className="items-center pt-5">
            <p className="text-l font-bold text-white">PASSWORD</p>
            <div className="mt-2 flex flex-col gap-2">
              <input
                type="text"
                className="h-12 w-full rounded-md border-2 border-white bg-body px-5 text-white focus:outline-none"
                placeholder="비밀번호를 입력해주세요."
              />
              <div>
                <p className="text-xs text-orange">
                  대소문자 6~10 이내, 숫자, 특수기호
                </p>
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-md border-2 border-white bg-body px-5 text-white focus:outline-none"
                placeholder="비밀번호를 다시 한번 입력해주세요."
              />
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center">
            <button
              type="button"
              className="h-12 w-full rounded-lg bg-black p-2 text-white"
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
}

export default SignUp;
