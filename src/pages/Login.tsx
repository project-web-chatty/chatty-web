import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="h-full p-20">
      <div className="flex items-center justify-center">
        <p className="text-3xl font-bold text-white">WELCOME TO&nbsp;</p>
        <p className="text-3xl font-bold text-orange">CHATTY</p>
      </div>
      <div className="flex items-center justify-center pt-14">
        <p className="text-xl font-bold text-white">SIGN UP</p>
      </div>
      <div className="items-center pt-10 mx-96">
        <p className="text-l font-bold text-white">ID</p>
        <div className="flex items-center mt-2">
          <input
            type="text"
            className="border-2 border-white w-full bg-body py-2 px-5 rounded-md text-white focus:outline-none"
            placeholder="아이디를 입력해주세요."
          ></input>
        </div>
      </div>
      <div className="items-center pt-5 mx-96">
        <p className="text-l font-bold text-white">PASSWORD</p>
        <div className="flex items-center mt-2">
          <input
            type="text"
            className="border-2 border-white w-full bg-body py-2 px-5 rounded-md text-white focus:outline-none"
            placeholder="비밀번호를 입력해주세요."
          ></input>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-xs text-purple">비밀번호를 잊어버렸나요?</p>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button className="bg-black w-full p-2 rounded-lg text-white">
            로그인
          </button>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-grey">webChatty를 처음 사용하시나요?</p>
          <Link to="/signup">
            <p className="text-xs text-purple pl-3">회원가입</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;