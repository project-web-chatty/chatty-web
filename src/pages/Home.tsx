import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import ChattingContainer from "../components/ChattingContainer";
import Modal from "../components/Modal"; //기본 Modal 컴포넌트
import MenuModal from "../components/MenuModal"; //Channel Name 우측 화살표를 누르면 나오는 메뉴 Options
import { channel } from "../types/channel";
import basic_img from "../assets/image/basic_img.jpg";
import {
  deleteWorkspace,
  getUserInfo,
  getWorkspaceChannels,
  getWorkspaceInfo,
} from "../api/workspace/WorkSpaceAPI";
import { Client, IMessage } from "@stomp/stompjs";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkspaceInfo } from "../features/workspaceSlice";
import { fetchUserInfo } from "../features/userSlice";
import ReactModal from "react-modal";
import ManageMembers from "../components/Modals/ManageMemberModal";
import CreateChannel from "../components/Modals/CreateChannelModal";
import LeaveWorkspace from "../components/Modals/LeaveWorkspaceModal";
import DeleteWorkspace from "../components/Modals/DeleteWorkspaceModal";
import EditWorkspaceInfo from "../components/Modals/EditWorkspaceInfoModal";
import CreateInvitationLink from "../components/Modals/CreateInvitationCodeModal";

// TODO : Response타입 정해지면 수정 필요. (현재는 임시)
interface Message {
  id: number | null;
  channelId: number;
  senderNickname: string;
  senderUsername: string;
  content: string;
  regDate: any;
}

//Member 인터페이스 정의
interface Member {
  id: number;
  nickname: string;
  profile: string;
  isManager: boolean;
}

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation();
  const { workspaceId } = state;
  const [channelId, setChannelId] = useState<number | null>(null); // 우측 채팅내역을 갖는 채널의 id
  const [workspaceDescription, setWorkspaceDescription] = useState<string>("");

  const user = useSelector((state: RootState) => state.user); // 유저 상태 조회
  const workspace = useSelector((state: RootState) => state.workspace);

  useEffect(() => {
    if (!user.id) getUserInfo().then((res) => dispatch(fetchUserInfo()));

    if (!!workspaceId) {
      getWorkspaceInfo(workspaceId).then((res) => {
        dispatch(fetchWorkspaceInfo(workspaceId));
      });

      getWorkspaceChannels(workspaceId).then((res) => {
        setChannels(() => res);
        setChannelId(() => res[0].id);
      });
    }
  }, []);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      padding: 0,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  /**
   * Chat 통신
   */
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const stompClient = new Client({
      brokerURL: `${process.env.REACT_APP_SOCKET_URL}`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
    });

    stompClient.onConnect = (frame) => {
      stompClient.subscribe(
        `/topic/channel.${channelId}`,
        (message: IMessage) => {
          if (message.body) {
            setMessages((prevMessages: Message[]) => [
              ...prevMessages,
              JSON.parse(message.body),
            ]);
          }
          console.log(message);
        }
      );
    };

    stompClient.onDisconnect = () => {
      console.log("Disconnected");
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [channelId]);

  const sendMessage = (message: string) => {
    if (client && client.connected) {
      // TODO : 메세지 형식 변경됨에 따라 추가수정 필요(아래 형식은 임시로 사용한다고 함)
      const chatMessage = {
        channelId,
        senderNickname: user.nickname,
        senderUsername: user.username,
        content: message,
      };

      client.publish({
        destination: `/pub/chat.message.${channelId}`,
        body: JSON.stringify(chatMessage),
      });

      setInput("");
    }
  };

  //멤버 관리하기 모달
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      nickname: "임준식",
      profile: People,
      isManager: false,
    },
    {
      id: 2,
      nickname: "최만구",
      profile: People,
      isManager: false,
    },
    {
      id: 3,
      nickname: "이승수",
      profile: People,
      isManager: false,
    },
    {
      id: 4,
      nickname: "손구근",
      profile: People,
      isManager: false,
    },
  ]);

  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [channels, setChannels] = useState<channel[] | null>(null);

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

  //키다운 핸들러(Enter 키 입력 시 메세지 전송)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing && !!input.length) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  //입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
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

  const onClickDeleteButton = () => {
    // TODO : USER가 오너인지, 멤버인지 권한 확인하는 코드 추가
    //   deleteWorkspace(workspaceId).then((res) => {
    //     if (res) {
    //       navigate("/workspace");
    //     }
    //   });
  };

  return (
    <div className="flex">
      {/* 맨 좌측 탭 */}
      <div className="w-24 min-h-screen flex flex-col justify-between bg-outerTab">
        <div className="mx-auto mt-6 bg-white w-10 h-10 rounded-md  overflow-hidden">
          <img src={workspace.profileImg ?? basic_img} alt="" />
        </div>
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
              className="inset-x-0 bottom-0 w-5 h-2 cursor-pointer"
              src={ArrowDown}
              alt=""
              onClick={toggleMenu}
            />
          </div>
          <div className="border border-white w-full mt-5"></div>
          <div style={{ overflowY: "auto", height: "calc(100vh - 120px)" }}>
            {channels?.map((channel, i) => (
              <div className="flex my-5 justify-between" key={channel.id}>
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
          {messages.map(
            ({ id, senderUsername, senderNickname, content, regDate }) => (
              <>
                <ChattingContainer // TODO : 추후 response타입 변경에 따라 수정 필요.
                  key={id}
                  nickname={senderNickname}
                  profile=""
                  chatting={content}
                  time={regDate}
                  isMe={user.nickname === senderNickname}
                />
              </>
            )
          )}
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
            onKeyDown={handleKeyPress}
            onKeyUp={handleKeyPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <button onClick={() => sendMessage(input)}>
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
      <ReactModal
        appElement={document.getElementById("root") as HTMLElement}
        isOpen={!!selectedModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {/* 각 Menu Options를 눌렀을 때 나오는 Modal. */}
        {selectedModal &&
          {
            "새 채널 만들기": (
              <CreateChannel
                workspaceId={workspaceId}
                title={selectedModal}
                closeModal={closeModal}
              />
            ),
            "워크스페이스 정보 수정": (
              <EditWorkspaceInfo
                workspaceId={workspaceId}
                title={selectedModal}
                closeModal={closeModal}
              />
            ),
            "멤버 관리하기": (
              <ManageMembers
                title={selectedModal}
                closeModal={closeModal}
                members={members}
              />
            ),
            "초대링크 생성하기": (
              <CreateInvitationLink
                workspaceId={workspaceId}
                title={selectedModal}
                closeModal={closeModal}
              />
            ),
            "워크스페이스 나가기": (
              <LeaveWorkspace title={selectedModal} closeModal={closeModal} />
            ),
            "워크스페이스 삭제": (
              <DeleteWorkspace title={selectedModal} closeModal={closeModal} />
            ),
          }[selectedModal]}
      </ReactModal>
    </div>
  );
}

export default Home;
