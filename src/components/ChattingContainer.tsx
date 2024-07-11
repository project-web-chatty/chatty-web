import React, { useState, useRef, useEffect } from "react";

function ChattingContainer({ nickname, profile, chatting, time, isMe }: any) {
  const [chatNick, setChatNick] = useState("");

  useEffect(() => {
    setChatNick(isMe ? "나" : nickname);
  }, [isMe, nickname]);

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
        <div id="me" className="flex justify-end mt-3">
          <div id="time" className="flex flex-col justify-end mr-3">
            <p className="text-xs text-black">{time}</p>
          </div>
          <div className="mr-3">
            <div id="nickname" className="flex justify-end">
              <p className="text-xs text-white">{chatNick}</p>
            </div>
            <div id="chatting" className="p-3 bg-white rounded-md mt-2">
              {/* <span className="text-xs text-black">{chatting}</span> */}
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
        <div id="you" className="flex mt-3">
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
              {/* <span className="text-xs text-black">{chatting}</span> */}
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
