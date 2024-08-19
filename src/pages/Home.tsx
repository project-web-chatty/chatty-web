import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeLogo from "../assets/icon/icon_home.png";
import MessageLogo from "../assets/icon/icon_message.png";
import UserLogo from "../assets/icon/icon_user.png";
import ArrowDown from "../assets/icon/icon_arrowDown.png";
import PlusCircle from "../assets/icon/icon_plusCircle.png";
import Search from "../assets/icon/icon_search.png";
import People from "../assets/icon/icon_people.png";
import Clip from "../assets/icon/icon_clipicon.png";
import SendMessage from "../assets/icon/icon_sendMessage.png";
import Upload from "../assets/icon/icon_upload.png";
import LinkLogo from "../assets/icon/icon_link.png";
import CopyLogo from "../assets/icon/icon_copy.png";
import ChattingContainer from "../components/ChattingContainer";
import Modal from "../components/Modal"; //기본 Modal 컴포넌트
import MenuModal from "../components/MenuModal"; //Channel Name 우측 화살표를 누르면 나오는 메뉴 Options
import { channel } from "../types/channel";
import { getWorkspaceChannels } from "../api/workspace/WorkSpaceAPI";

//Message 인터페이스 정의
interface Message {
  id: number;
  nickname: string;
  profile: string;
  chatting: string;
  time: string;
  isMe: boolean;
}

//Member 인터페이스 정의
interface Member {
  id: number;
  nickname: string;
  profile: string;
  isManager: boolean;
}

function Home() {
  //messages 상태 변수와 setMessages 함수 정의
  const [messages, setMessages] = useState<Message[] | null>();

  //멤버 관리하기 모달
  const [members, setMembers] = useState<Member[] | null>();

  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [channels, setChannels] = useState<channel[] | null>(null);

  useEffect(() => {
    getWorkspaceChannels(4).then((res) => {
      setChannels(() => res);
    });
  }, []);

  const openWorkspaceModal = () => setIsWorkspaceModalOpen(true);
  const closeWorkspaceModal = () => setIsWorkspaceModalOpen(false);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedModal(item);
    toggleMenu();
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  //input 상태 변수와 setInput 함수 정의
  const [input, setInput] = useState<string>("");
  //isComposing 상태 변수와 setIsComposing 함수 정의
  //조합상태감지를 위한 상태변수. 조합문자란, 아직 완성되지 않은 문자로, 여러 키 입력이 조합되어 최종문자가 만들어지는 과정을 말함(한글, 중국어, 일본어 등).
  //isComposing이 적용되지 않으면, 채팅을 엔터로 입력 시, 마지막 글자가 중복되서 한번 더 채팅으로 보내짐.
  const [isComposing, setIsComposing] = useState<boolean>(false);
  //chatEndRef ref 변수 정의
  const chatEndRef = useRef<HTMLDivElement>(null);

  //messages 상태가 변경될 때마다 chatEndRef를 이용해 스크롤을 끝으로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  //메세지 전송 핸들러
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => {
        //이전 메세지 배열이 비어 있는지 확인하고, 비어 있지 않으면 마지막 메세지의 id를 가져옴
        if (prevMessages) {
          const newId =
            prevMessages.length > 0
              ? prevMessages[prevMessages.length - 1].id + 1
              : 1;
          return [
            ...prevMessages,
            {
              id: newId,
              nickname: "아무게",
              profile: People,
              chatting: input,
              time: new Date().toLocaleTimeString(),
              isMe: true,
            },
          ];
        }
      });
      setInput("");
    }
  };

  //키다운 핸들러(Enter 키 입력 시 메세지 전송)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isComposing) {
        handleSendMessage();
      }
    }
  };

  //입력 구성 시작 핸들러
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  //입력 구성 끝 핸들러
  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLTextAreaElement>
  ) => {
    setIsComposing(false);
    setInput(e.currentTarget.value);
  };

  //키업 핸들러 (Enter 키 입력 시 메세지 전송)
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex">
      {/* 맨 좌측 탭 */}
      <div className="w-24 min-h-screen flex flex-col justify-between bg-outerTab">
        <div className="mx-auto mt-6 bg-white w-10 h-10 rounded-md"></div>
        <div className="mx-auto mb-6">
          <div
            className="bg-white inset-x-0 bottom-0 rounded-xl mb-6"
            onClick={openWorkspaceModal}
          >
            <img className="w-10 h-10" src={MessageLogo} alt="" />
          </div>
          <img
            className="inset-x-0 bottom-0 w-10 h-10 mb-6"
            src={HomeLogo}
            alt=""
          />
          <img className="inset-x-0 bottom-0 w-10 h-10" src={UserLogo} alt="" />
        </div>
      </div>
      {/* 두번째 탭 */}
      <div className="w-72 min-h-screen flex flex-col justify-between bg-body py-6 px-4">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-white">Channel Name</p>
            <img
              className="inset-x-0 bottom-0 w-5 h-2"
              src={ArrowDown}
              alt=""
              onClick={toggleMenu}
            />
          </div>
          <div className="border border-white w-full mt-5"></div>
          <div style={{ overflowY: "auto", height: "calc(100vh - 120px)" }}>
            {channels?.map((channel, i) => (
              <div className="flex my-5 justify-between">
                <p className="text-sm font-bold text-white"># {channel.name}</p>
                {/* <p className="text-xs text-gray">5 new messaages</p> */}
              </div>
            ))}
          </div>
          <div className="flex">
            <img className="w-5 h-5" src={PlusCircle} alt="" />
            <p className="text-sm text-white ml-5">채널 생성</p>
          </div>
        </div>
      </div>
      {/* 세번째 탭 */}
      <div
        className="bg-chatting min-h-screen flex flex-col p-6"
        style={{ width: "calc(100vw - 24rem)" }}
      >
        <div className="flex justify-between items-center pb-6">
          <p className="text-xl font-bold text-white"># FRONTEND</p>
          <img className="w-5 h-5" src={Search} alt="" />
        </div>
        <div
          id="chatContanier"
          className="px-2 overflow-y-auto"
          style={{ height: "calc(100vh - 172px)" }}
        >
          {messages?.map(({ id, nickname, profile, chatting, time, isMe }) => (
            <>
              <ChattingContainer
                key={id}
                nickname={nickname}
                profile={profile}
                chatting={chatting}
                time={time}
                isMe={isMe}
              />
            </>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="w-full h-12 bg-white flex items-center justify-between mt-6 rounded-lg px-3">
          <img id="clip" className="w-5 h-5" src={Clip} alt="" />
          {/*
            1. onKeyDown : 키를 누르기 시작할 때 발생하는 이벤트. 키가 눌려있는 동안 여러 번 발생할 수도 있다.
            2. onKeyUp : 키를 놓을 때 발생하는 이벤트.
            3. onCompositionStart : 사용자가 텍스트 입력을 시작할 때 발생. 주로 입력기가 활성화될 대 발생하며, 다국어 입력 시 조합 문자를 입력하기 시작할 때 트리거 됨.
            4. onCompositionEnd : 사용자가 텍스트 입력을 완료했을 때 발생. 조합 문자가 완성되거나 입력이 종료될 때 트리거 됨.
          */}
          <textarea
            className="w-full h-12 mx-3 focus:outline-none resize-none flex-1"
            style={{ resize: "none" }}
            placeholder="메세지를 입력해주세요."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <button onClick={handleSendMessage}>
            <img id="submit" className="w-5 h-5" src={SendMessage} alt="" />
          </button>
        </div>
      </div>
      {/* 맨 좌측(첫번째)탭의 연필 로고를 클릭하면 나오는 Modal, 새 워크스페이스 만들기 모달 */}
      <Modal
        isOpen={isWorkspaceModalOpen}
        onClose={closeWorkspaceModal}
        title={"새 워크스페이스 만들기"}
      >
        <div className="py-5">
          <p className="text-sm">워크스페이스 이름</p>
          <input
            type="text"
            className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
            placeholder="이름을 정해주세요."
          />
          <p className="text-sm mt-5">소개</p>
          <input
            type="text"
            className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
            placeholder="소개글을 작성해주세요."
          />
          <div className="flex justify-between mt-5 items-center">
            <div className="flex">
              <p className="text-sm">로고 업로드</p>
              <img id="clip" className="w-5 h-5 ml-5" src={Upload} alt="" />
            </div>
            <button className="bg-black text-sm text-white py-1 px-5 rounded-md">
              생성 하기
            </button>
          </div>
        </div>
      </Modal>
      {/* Channel Name 우측 화살표를 클릭하면 나오는 Menu Options */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        onMenuItemClick={handleMenuItemClick}
      />
      {/* 각 Menu Options를 눌렀을 때 나오는 Modal. */}
      <Modal
        isOpen={!!selectedModal}
        onClose={closeModal}
        title={selectedModal}
      >
        {/* 메뉴 클릭 시 전달된 항목 이름이 "새 채널 만들기" 일 경우, 즉 "채널 생성" 메뉴를 클릭했을 때. */}
        {selectedModal === "새 채널 만들기" && (
          <div className="py-5">
            <p className="text-sm">채널 이름</p>
            <input
              type="text"
              className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
              placeholder="이름을 정해주세요."
            />
            <div className="flex justify-end mt-5 items-center">
              <button className="bg-purple text-sm text-white py-1 px-5 rounded-md">
                생성하기
              </button>
            </div>
          </div>
        )}
        {/* 메뉴 클릭 시 전달된 항목 이름이 "워크스페이스 이름 변경하기" 일 경우, 즉 "서버 이름 변경" 메뉴를 클릭했을 때. */}
        {selectedModal === "워크스페이스 이름 변경하기" && (
          <div className="py-5">
            <p className="text-sm">서버 이름</p>
            <input
              type="text"
              className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
              placeholder="이름을 정해주세요."
            />
            <div className="flex justify-end mt-5 items-center">
              <button className="bg-purple text-sm text-white py-1 px-5 rounded-md">
                변경하기
              </button>
            </div>
          </div>
        )}
        {/* 메뉴 클릭 시 전달된 항목 이름이 "멤버 관리하기" 일 경우, 즉 "멤버 관리" 메뉴를 클릭했을 때. */}
        {selectedModal === "멤버 관리하기" && (
          <div>
            <div className="p-5 flex items-center bg-lightGray rounded-lg mt-3">
              <div className="flex flex-wrap gap-4">
                {members?.map((member) => (
                  <div key={member.id} className="flex items-center ml-2">
                    <img
                      className="w-5 h-5 rounded-xl"
                      src={member.profile}
                      alt=""
                    />
                    <p className="text-xs mx-3">{member.nickname}</p>
                    <button className="text-gray-500 hover:text-gray-700 mr-4">
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-5 items-center">
              <button className="bg-purple text-sm text-white py-1 px-5 rounded-md">
                변경하기
              </button>
            </div>
          </div>
        )}
        {/* 메뉴 클릭 시 전달된 항목 이름이 "초대링크 생성하기" 일 경우, 즉 "초대 링크" 메뉴를 클릭했을 때. */}
        {selectedModal === "초대링크 생성하기" && (
          <div className="py-5">
            <p className="text-sm">초대링크</p>
            <div className="flex w-full items-center mt-2">
              <div className="flex border-2 border-black w-full p-2 rounded-md items-center mr-3">
                <input
                  type="text"
                  className="w-full text-sm focus:outline-none"
                  placeholder="초대링크를 입력해주세요."
                />
                <img className="w-3 h-3" src={LinkLogo} alt="" />
              </div>
              <img className="w-3 h-3" src={CopyLogo} alt="" />
            </div>
          </div>
        )}
        {/* 메뉴 클릭 시 전달된 항목 이름이 "워크스페이스 나가기" 일 경우, 즉 "서버 나가기" 메뉴를 클릭했을 때. */}
        {selectedModal === "워크스페이스 나가기" && (
          <div className="pt-10">
            <div className="flex justify-center">
              <p className="text-sm font-bold">정말로 나가시겠어요?</p>
            </div>
            <div className="flex justify-between mt-10 items-center">
              <button className="w-24 bg-white text-sm text-black py-1 px-5 rounded-md border-2 border-black">
                취소
              </button>
              <button className="w-24 bg-orange text-sm text-white py-1 px-5 rounded-md">
                나가기
              </button>
            </div>
          </div>
        )}
        {/* 메뉴 클릭 시 전달된 항목 이름이 "워크스페이스 삭제하기" 일 경우, 즉 "서버 삭제" 메뉴를 클릭했을 때. */}
        {selectedModal === "워크스페이스 삭제하기" && (
          <div className="pt-10">
            <div className="flex justify-center">
              <p className="text-sm font-bold">정말로 삭제하시겠어요?</p>
            </div>
            <div className="flex justify-between mt-10 items-center">
              <button className="w-24 bg-white text-sm text-black py-1 px-5 rounded-md border-2 border-black">
                취소
              </button>
              <button className="w-24 bg-orange text-sm text-white py-1 px-5 rounded-md">
                삭제하기
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Home;
