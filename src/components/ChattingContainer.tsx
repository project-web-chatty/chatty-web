import React, { useState, useRef, useEffect } from "react";

//ChattingContainer 컴포넌트 정의
function ChattingContainer({ nickname, profile, chatting, time, isMe }: any) {
  //chatNick 상태 변수와 setChatNick 함수 정의
  const [chatNick, setChatNick] = useState("");

  //isMe와 nickname에 따라 chatNick을 설정
  useEffect(() => {
    setChatNick(isMe ? "나" : nickname);
  }, [isMe, nickname]);

  //메세지 포맷팅 함수 정의 (개행 문자를 <br/>로 변환)
  const formatMessage = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      {isMe ? (
        <div id="me" className="flex justify-end my-5">
          <div id="time" className="flex flex-col justify-end mr-3">
            <p className="text-xs text-black">{time}</p>
          </div>
          <div className="mr-3">
            <div id="nickname" className="flex justify-end">
              <p className="text-xs text-white">{chatNick}</p>
            </div>
            <div id="chatting" className="p-3 bg-white rounded-md mt-2">
              <span className="text-xs text-black">
                {formatMessage(chatting)}
              </span>
            </div>
          </div>
          <img
            id="profile"
            className="w-10 h-10 rounded-md"
            src={profile}
            alt=""
          />
        </div>
      ) : (
        <div id="you" className="flex my-5">
          <img
            id="profile"
            className="w-10 h-10 rounded-md"
            src={profile}
            alt=""
          />
          <div className="ml-3">
            <p id="nickname" className="text-xs text-white">
              {chatNick}
            </p>
            <div id="chatting" className="p-3 bg-white rounded-md mt-2">
              <span className="text-xs text-black">
                {formatMessage(chatting)}
              </span>
            </div>
          </div>
          <div id="time" className="flex flex-col justify-end ml-3">
            <p className="text-xs text-black">{time}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChattingContainer;
